const bcrypt = require("bcrypt");

const User = require("../models/user.model");

async function insert(user) {
  // console.log("User: ", User.create);
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  // console.log(`saving user to db`, user);

  return await new User(user).save();
}

module.exports = {
  insert,
};
