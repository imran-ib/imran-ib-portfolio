const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport } = require("../Mail/Mail");
const { NiceEmailTemplate } = require("../Mail/EmailTemplate");
const { hasPermission } = require("../utils");

const ErrorMessages = {
  loginError: "You are not loged in, Plese login first ",
  validEmail: "Please Provide a Valid Email",
  noUserExist: "No User Found with ",
  InvalidPassword: "Your Password is not correct",
  IvalidPermission: "You Don't Have Permission"
};

const Mutation = {
  async RegisterUser(parent, args, { db, response }, info) {
    //1. Check if the email is valid and lowercase the email
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let email = args.email;
    if (regexEmail.test(email)) {
      // lowercase email

      email = await email.toLowerCase();
    } else {
      throw new Error(ErrorMessages.validEmail);
    }
    //2. check if the email is already registerd (in model we are using @unique decorator so it is already taken care of by prisma)
    //3. hash the password
    let password = args.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    //4. save to db
    const user = await db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password: hashedPassword,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //5. create JWT Token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //6. set JWT as cookie on the response
    await response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1year cookie
    });
    //.5 send success message

    return user;
  },
  async SignIn(parent, { email, password }, { db, response }, info) {
    //1. check if user is registred
    const user = await db.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error(`${ErrorMessages.noUserExist} ${email}`);
    }
    //2. check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error(ErrorMessages.InvalidPassword);
    }
    //3. create JWT Token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //4. set JWT as cookie on the response
    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1year cookie
    });

    //.5 send success message
    return user;
  },
  async SignOut(parent, args, { db, response }, info) {
    response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async requestReset(parent, args, { db }, info) {
    //1. check if the email is real
    const user = await db.query.user({
      where: { email: args.email }
    });
    if (!user) {
      throw new Error(`${ErrorMessages.noUserExist} ${args.email}`);
    }
    //2. set a reset token and expiry
    const randomBytesPromisify = promisify(randomBytes);
    const resetToken = (await randomBytesPromisify(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 360000; // 1 hour from now
    const res = await db.mutation.updateUser({
      where: { email: args.email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });
    //3. email that reset token
    const link = `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`; // this link is for template
    let mailRes = await transport.sendMail({
      from: '"Imran Irhad 👻" <imran.ib@live.com>', // sender address
      to: user.email, // list of receivers
      subject: "Password Reset Token ✔", // Subject line
      text: "Hello world?", // plain text body
      html: NiceEmailTemplate(
        `Your Password Reset Token is here 
      \n\n
      <a  href="${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetToken}">Click Here To Reset Your Password</a>
      `,
        link
      ) // html body
    });

    return { message: "Thanks" };
  },
  async resetPassword(parent, args, { db, response }, info) {
    //1. check if password match
    const { password } = args;
    const { confirmPassword } = args;
    if (password !== confirmPassword) {
      throw new Error(`Password do not match`);
    }
    //2. check if resetToken is legit
    //3. check if token is expire
    const [user] = await db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 360000
      }
    });
    if (!user) {
      throw new Error(`Your Token is Either expired or invalid`);
    }
    //4. Hash new Password
    const hashedPassword = await bcrypt.hash(args.password, 10);
    //5. save new password to user and remove resetToken
    const updatedUser = await db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    //6. Generate JWT
    //7. Set JWT Cookie
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //4. set JWT as cookie on the response
    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1year cookie
    });
    //8. return new user
    return updatedUser;
  },
  async updatePermission(parent, args, { db, request }, info) {
    //1. check if the user id loged in
    if (!request.userId) {
      throw new Error(ErrorMessages.loginError);
    }
    //2. Query the current user
    const user = await db.query.user(
      {
        where: {
          id: request.userId
        }
      },
      info
    );
    //3. check if they have permission to do that
    hasPermission(user, ["ADMIN", "UPRDATEPERMISSION"]);
    //4. update Permissions
    return db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  },
  async createPortfolio(parent, args, { db, request }, info) {
    //1. Check if the user sign in
    if (!request.userId) {
      throw new Error(ErrorMessages.loginError);
    }
    //2.  check if they have correct permission
    hasPermission(request.user, ["ADMIN", "UPRDATEPERMISSION"]);
    //3. save portfolio db
    //4. return portfolio
    const portfolio = await db.mutation.createPortfolio(
      {
        data: {
          user: {
            connect: {
              id: request.userId
            }
          },
          ...args
        }
      },

      info
    );
    return portfolio;
  },
  async updatePortfolio(parent, args, { db, request }, info) {
    //1. Check if the user sign in
    if (!request.userId) {
      throw new Error(ErrorMessages.loginError);
    }
    //2.  check if they have correct permission
    hasPermission(request.user, ["ADMIN", "UPRDATEPERMISSION"]);
    //3. create copy of updates
    console.log(args);
    const updates = { ...args };

    //4. remove the id of portfolio
    delete updates.id;
    //5. run the uodate method
    return db.mutation.updatePortfolio({
      data: updates,
      where: {
        id: args.id
      }
    });
  },
  async deletePortfolio(parent, args, { db, request }, info) {
    //1. check if use is loged in
    if (!request.userId) {
      throw new Error(ErrorMessages.loginError);
    }
    //2.  Find the Portfolio
    const PortFolioToBeDelete = await db.query.portfolio(
      {
        where: {
          id: args.id
        }
      },
      `{id title user { id } }`
    );
    // 3. Check if they own the item or have the permision to delete it
    const OwnsPortFolio = PortFolioToBeDelete.user.id === request.userId;
    // if the id of portfolio's user is same as id of request userId then its the owner
    const CheckPermissions = request.user.permissions.some(permission => {
      return ["ADMIN", "DELETEPORTFOLIO"];
    });
    if (!OwnsPortFolio && !CheckPermissions) {
      throw new Error(ErrorMessages.IvalidPermission);
    }
    // 4. Delete it
    return db.mutation.deletePortfolio(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createBlog(parent, args, { db, request }, info) {
    //1. Check if the user sign in
    if (!request.userId) {
      throw new Error(ErrorMessages.loginError);
    }
    //2.  check if they have correct permission
    hasPermission(request.user, ["ADMIN", "ADDBLOG"]);
    //3. save portfolio db
    const blog = await db.mutation.createBlog(
      {
        data: {
          author: {
            connect: {
              id: request.userId
            }
          },
          ...args
        }
      },
      info
    );
    console.log(blog);
    //4. return portfolio
    return blog;
  }
};

module.exports = Mutation;
