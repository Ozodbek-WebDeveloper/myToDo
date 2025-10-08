const express = require("express");
const todoController = require("../controller/todo.controller");
const route = express.Router();

route.post("/todo", todoController.create);
route.post("/todo/paging", todoController.getAll);
route.get("/todo/:id", todoController.findOne);
route.put("/todo/:id", todoController.put);
route.delete("/todo/:id", todoController.delete);

module.exports = route;
