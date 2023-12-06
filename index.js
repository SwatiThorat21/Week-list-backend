const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/auth")

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "Weeklist-backend-server",
    time: new Date().toString(),
    status: "active",
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "SUCCESS",
    message: "All good!",
  });
});

app.use('/auth', authRoutes);

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
