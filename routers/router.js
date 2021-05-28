const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const pathToUsers = path.normalize(__dirname + "/../db/users.json");
// console.log(pathToUsers);

router.get("/hello", (req, res) => {
  res.send(`Hello World!`);
});

router.get("/user", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToUsers));
  console.log(users);
  res.json(users);
});

router.post("/user", (req, res) => {
  const body = req.body;

  const users = JSON.parse(fs.readFileSync(pathToUsers));
  users.push(body);

  fs.writeFileSync(pathToUsers, JSON.stringify(users, null, 2));

  res.json({ message: "Пользователь создан", user: body }).status(201).send("Created");
});

router.delete("/user/:password", (req, res) => {
  const password = +req.params.password;
  // console.log(password);

  const users = JSON.parse(fs.readFileSync(pathToUsers));

  const newUsers = users.filter((user) => +user.password !== password);
  fs.writeFileSync(pathToUsers, JSON.stringify(newUsers, null, 2));

  res.status(204).send("Deleted");
});

// router.patch("/user/:login", (req, res) => {
//   let login = req.params.login;
//   console.log(login);

//   const users = JSON.parse(fs.readFileSync(pathToUsers));

//   const newUserLogin = users.find((user) => {
//     // if (user.login !== login) {
//     //   console.log("Такого пользователя нет!");
//     //   return;
//     // }

//     // return { ...user, login: req.body };
//     user.login === login;
//     return req.body;
//   });

//   fs.writeFileSync(pathToUsers, JSON.stringify(newUserLogin, null, 2));

//   res.send("Updated");
// });

module.exports = router;
