const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({
    status: "SUCCESS",
    message: "All good!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "Weeklist-backend-server",
    time: new Date().toString(),
    status: "active",
  });
});

//Signup route
app.post("/signup", async (req, res) => {
  console.log(req.body);
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
    res.json({
      status: "FAILED",
      message: "Something went wrong !",
    });
  }
});

//Login route
app.post("/login", async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    // console.log(user)
    if (user) {
      let hasPasswordMatch = await bcrypt.compare(password, user.password);
      if (hasPasswordMatch) {
        res.json({
          status: "SUCCESS",
          message: "You've logged in sucessfully !!",
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
    res.json({
      status: "FAILED",
      message: "incorrect credentials !",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});
