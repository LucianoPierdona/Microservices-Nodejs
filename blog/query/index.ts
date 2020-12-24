import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Comment {
  id: string;
  content: string;
  status: string;
}

interface Posts {
  [key: string]: any;
  id?: string;
  title?: string;
  comments?: Comment[];
}

interface Data {
  id: string;
  postId: string;
  title?: string;
  content?: string;
  status?: string;
}

let posts: Posts = {};

const handleEvent = (type: string, data: Data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment: Comment) => {
      return comment.id === id;
    });

    comment.content = content;
    comment.status = status;
  }
};

app.get("/posts", (req: Request, res: Response) => {
  return res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  return res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on port 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    handleEvent(event.type, event.data);
  }
});
