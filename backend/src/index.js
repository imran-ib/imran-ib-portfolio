require("dotenv").config();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("./db");
const createServer = require("./createServer");
const server = createServer();

server.express.use(cookieParser());

// decode the jwt so that we can get user id on each request
server.express.use((req, res, next) => {
  // get token from cookies
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId on the future requests to access
    req.userId = userId;
  }
  next();
});
// populate the user on each request
server.express.use(async (req, res, next) => {
  // they are not loged in skip this
  if (!req.userId) return next();

  const user = await db.query.user(
    { where: { id: req.userId } },
    `{id , permissions , email , name}`
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
