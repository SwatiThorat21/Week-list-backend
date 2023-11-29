const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

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
  console.log("server running suessfully!!");
});
