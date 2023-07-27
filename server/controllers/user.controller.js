users = [];

async function insert(user) {
  users.push(user);
  return user;
}

module.exports = {
  insert
}
