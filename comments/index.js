const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const commentByPostId = {};

// for show all the comments for a particular post
app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentByPostId[req.params.id] || []);
});
// for create a new comment on a particular posts
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  console.log(content);
  const comment = commentByPostId[req.params.id] || [];

  comment.push({ id: commentId, content });
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  commentByPostId[req.params.id] = comment;
  res.status(201).send(comment);
  //console.log(comment);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});

app.listen(4001, (req, res) => {
  console.log("listening on 4001");
});
