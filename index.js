const express = require("express");

const app = express();

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

app.listen(3000, () => {
  console.log("server running suessfully!!");
});
