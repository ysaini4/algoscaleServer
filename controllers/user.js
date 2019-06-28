const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(403)
        .send({ status: false, msg: "Invalid username and password." });
    }
    const validateuser = await bcrypt.compare(req.body.password, user.password);
    if (!validateuser)
      return res
        .status(400)
        .send({ status: false, msg: "Invalid username and password." });
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ status: true, msg: "Login Successful." });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
