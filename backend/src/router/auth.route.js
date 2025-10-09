const express = require("express");
const authController = require("../controller/auth.controller");
const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.get("/refresh", authController.refresh);
route.get("/activeted/:id", authController.activeted);
module.exports = route;
