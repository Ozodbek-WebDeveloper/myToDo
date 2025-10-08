const express = require("express");
const { default: mongose } = require("mongoose");
const todoRoute = require("./src/router/todo.route");
const authRoute = require("./src/router/auth.route");
require("dotenv").config();
const app = express();
app.use(express.json());
// routes
app.use("/api", todoRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT;
const start = async () => {
  try {
    await mongose
      .connect(process.env.DB_URL)
      .then(console.log("connection db"));
    app.listen(
      port,
      console.log(`my todo list server listen http://localhost:${port}`)
    );
  } catch (error) {
    console.log(`Error connection with db ${error}`);
  }
};

start();
