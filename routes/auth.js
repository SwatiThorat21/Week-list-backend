const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup route

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, age, gender, mobile } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: encryptedPassword,
      age,
      gender,
      mobile,
    });
    res.json({
      status: "SUCCESS",
      message: "You've signed up sucessfully !!",
    });
  } catch (error) {
    console.log(error)
    res.json({
      status: "FAILED",
      message: "Something went wrong !",
    });
  }
});

//Login route

router.post("/login", async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user)
    if (user) {
      let hasPasswordMatch = await bcrypt.compare(password, user.password);
      if (hasPasswordMatch) {
        const jwToken = jwt.sign(user.toJSON(), process.env.JWT_SCRETEKEY, {
          expiresIn: 15,
        });
        res.json({
          status: "SUCCESS",
          message: "You've logged in sucessfully !!",
          jwToken
        });
      } else {
        res.json({
          status: "FAILED",
          message: "incorrect credentials !",
        });
      }
    } else {
      res.json({
        status: "FAILED",
        message: "User does not exist !",
      });
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: "FAILED",
      message: "incorrect credentials !",
    });
  }
});

module.exports = router;
