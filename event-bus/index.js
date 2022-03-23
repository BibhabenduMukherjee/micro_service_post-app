const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// this service is event broker system
// it is alwlays lidten all the event that is going on
// recieve some events and
app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
