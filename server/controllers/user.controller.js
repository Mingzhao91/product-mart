const bcrypt = require("bcrypt");

const User = require("../models/user.model");

async function insert(user) {
  // console.log("User: ", User.create);
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  // console.log(`saving user to db`, user);

  return await new User(user).save();
}

async function getUserByEmailIdAndPassword(email, password) {
  let user = await User.findOne({ email });

  if (await isUserValid(user, password, user.hashedPassword)) {
    user = user.toObject();
    delete user.hashedPassword;
    return user;
  } else {
    return null;
  }
}

async function getUserById(id) {
  let user = await User.findById(id);

  if (user) {
    user = user.toObject();
    delete user.hashedPassword;
    return user;
  } else {
    return null;
  }
}

async function isUserValid(user, password, hashedPassword) {
  return user && (await bcrypt.compare(password, hashedPassword));
}

module.exports = {
  insert,
  getUserByEmailIdAndPassword,
  getUserById,
};
