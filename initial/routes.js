const express = require("express");
const twitter = require("../controllers/twitter");
const user = require("../controllers/user");

module.exports = function(app) {
  app.use("/twitter", twitter);
  app.use("/user", user);
};
