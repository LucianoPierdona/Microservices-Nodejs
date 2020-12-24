const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const status = "pending";
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, content, status });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      status,
      postId: req.params.id,
    },
  });

  return res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  return res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
