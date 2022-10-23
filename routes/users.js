const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} = require("../models/users.js");

userRouter.get("/", async function (req, res) {
  const users = await getUsers();
  console.log("Users fetched!");
  res.status(200).json(users);
}) 

userRouter.get("/:id", async function (req, res) {
  const user = await getUserByID(req.params.id);
  console.log("User fetched!");
  res.status(200).json(user);
})

userRouter.post("/", async function (req, res) {
  const user = await createUser(req.body.first_name, req.body.last_name, req.body.email, req.body.catchphrase);
  console.log("User added!");
  res.status(201).json(user);
})

userRouter.patch("/:id", async function (req, res) {
  const user = await updateUserByID(req.params.id, req.body.first_name, req.body.last_name, req.body.email, req.body.catchphrase);
  console.log("User updated!");
  res.status(201).json(user);
})

userRouter.delete("/:id", async function (req, res) {
  const user = await deleteUserByID(req.params.id);
  console.log("User deleted!");
  res.status(200).json(user);
})

module.exports = userRouter;
