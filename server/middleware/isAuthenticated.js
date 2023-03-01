require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

// this creates a fuction called isAuthenticated that takes in  the request and response and a fucntion that gets invoked called next
const isAuthenticated = (req, res, next) => {
  const headerToken = req.get("Authorization");
  //  if headerToken doesn't exist send a status code 401 on the response
  if (!headerToken) {
    console.log("ERROR IN auth middleware");
    res.sendStatus(401);
  }

  let token;
  // the token is being created
  try {
    token = jwt.verify(headerToken, SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // if token doesn't exist throw this error
  if (!token) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  // if everthing run correctly this next fuction will be invoked
  console.log("User is authenticated.");

  next();
};

module.exports = {
  isAuthenticated,
};
