const express = require("express");
const authController = require("../controller/auth.controller");
const route = express.Router();
const authMiddleware = require('../middleware/auth.Middleware')

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.get("/refresh", authController.refresh);
route.get("/activeted/:id", authController.activeted);
route.get("/me", authMiddleware.verifyToken, authController.me);
route.post("/edit/:id", authMiddleware.verifyToken, authController.editMe);
route.get('/getUsers', authMiddleware.verifyToken, authController.getAll)
route.delete('/user/:id', authMiddleware.verifyToken, authController.detele)
route.post('/activeLink/:id', authController.activeLink)
module.exports = route;
