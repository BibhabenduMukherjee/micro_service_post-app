const express = require("express");
const { randomBytes } = require("crypto");
const app = express(); //
const cors = require("cors");
const axios = require("axios");
// local storage where we store post
const posts = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// get all the posts
app.get("/posts", (req, res) => {
  res.send(posts);
});
// for post the a new blog
app.post("/posts", async (req, res) => {
  // we recieve the posts and let's generate a id for the post
  const postId = randomBytes(4).toString("hex");

  const { title } = req.body;
  //console.log(title);
  const d = new Date();
  const timeStamp = d.getHours() + ":" + d.getMinutes();
  posts[postId] = {
    postId,
    title,
    timeS: timeStamp,
  };
  await axios.post("http://localhost:4005/events", {
    type: "postCreated",
    data: {
      id: postId,
      title,
    },
  });
  res.status(200).send(posts[postId]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});

Comment = {};

app.listen(4000, () => {
  console.log("listening on port 4000");
});
