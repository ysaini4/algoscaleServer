const express = require("express");
var cors = require("cors");

module.exports = function(app) {
  app.use(cors());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
