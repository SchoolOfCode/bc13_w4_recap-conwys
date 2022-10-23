const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.resolve(process.cwd(), "data", "users.json");

async function getUsers() {
  const usersJSON = await fs.readFile(filePath);
  const users = JSON.parse(usersJSON);
  return users;
}

async function getUserByID(id) {
  const usersJSON = await fs.readFile(filePath);
  const users = JSON.parse(usersJSON);
  let user = null;
  for (let i=0; i<users.length; i++) {
    if (users[i].id === id) {
      user = users[i];
    }
  }
  return user;
}

async function createUser(newUser) {
  const usersJSON = await fs.readFile(filePath);
  const users = JSON.parse(usersJSON);
  const userToAdd = {
    id: uuidv4(),
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    catchphrase: newUser.catchphrase,
  }
  users.push(userToAdd);
  await fs.writeFile(filePath, JSON.stringify(users));
  return userToAdd;
}

async function updateUserByID(id, updatedUser) {
  const usersJSON = await fs.readFile(filePath);
  const users = JSON.parse(usersJSON);
  let user = null;
  for (let i=0; i<users.length; i++) {
    if (users[i].id === id) {
      user = users[i];
      user.first_name = updatedUser.first_name;
      user.last_name = updatedUser.last_name;
      user.email = updatedUser.email;
      user.catchphrase = updatedUser.catchphrase;
    }
  }
  await fs.writeFile(filePath, JSON.stringify(users));

  return updatedUser;
}

async function deleteUserByID(id) {
  const usersJSON = await fs.readFile(filePath);
  const users = JSON.parse(usersJSON);
  let userIndex = null;
  for (let i=0; i<users.length; i++) {
    if (users[i].id === id) {
      userIndex = i;
      break;
    }
  }
  if (userIndex !== null){
    const deletedUser = users.splice(userIndex, 1);
    await fs.writeFile(filePath, JSON.stringify(users));
    return deletedUser;
  }
  return null;
}

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
};
