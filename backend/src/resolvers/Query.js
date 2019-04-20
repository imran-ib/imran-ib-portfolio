const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  users: forwardTo("db"),
  portfolio: forwardTo("db"),
  portfolios: forwardTo("db"),
  blog: forwardTo("db"),
  blogs: forwardTo("db"),
  me(parent, args, { db, request }, info) {
    if (!request.userId) {
      return null;
    }
    const user = db.query.user(
      {
        where: {
          id: request.userId
        }
      },
      info
    );

    return user;
  },
  async users(parent, args, { db, request }, info) {
    //1. check if the user is loged in
    if (!request.userId) {
      throw new Error(`Please Login first`);
    }
    //2. check if they have permisions to query users
    hasPermission(request.user, ["ADMIN", "UPRDATEPERMISSION"]);
    //3. Query all the users
    return db.query.users({}, info);
  }
};

module.exports = Query;
