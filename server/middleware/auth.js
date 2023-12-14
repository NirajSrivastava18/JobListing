const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const { jwttoken } = req.headers;
    const user = jwt.verify(jwttoken, process.env.JWT);
    req.user = user;
    return next();
  } catch (err) {
    res.json({
      status: 'FAILED',
      message: "You've not logged in! Please login",
    });
    return;
  }
};
module.exports = { isLoggedIn };
