const express = require("express");
const authController = require("../controller/auth.controller");
const route = express.Router();

route.post("/register", authController.register);

module.exports = route;
