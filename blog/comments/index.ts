import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface Comment {
  id?: string;
  content?: string;
  status?: string;
}

interface CommentsByPostId extends Comment {
  [key: string]: any;
}

const commentsByPostId: CommentsByPostId = {};

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

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, content, status, id } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment: Comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  return res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
