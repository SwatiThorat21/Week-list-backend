const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const weekList = mongoose.model("weekList", {
  list: String,
});

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.get("/health", (req, res) => {
  const serverName = "Week list";
  const currentTime = new Date().toString();
  const serverState = "active";

  res.json({
    serverName,
    currentTime,
    state: serverState,
  });
});

app.use((req, res) => {
  res.json({ error: "route not found" });
});

app.listen(3000, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});
