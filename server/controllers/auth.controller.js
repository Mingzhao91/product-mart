const jwt = require("jsonwebtoken");
const config = require("../config/config");

function generateToken(user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: "30d",
  });
}

module.exports = {
  generateToken,
};
