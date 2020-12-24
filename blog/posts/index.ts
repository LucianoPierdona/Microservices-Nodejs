import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Posts {
  [key: string]: any;
  id?: string;
  title?: string;
}

const posts: Posts = {};

app.get("/posts", (req: Request, res: Response) => {
  return res.send(posts);
});

app.post("/posts", async (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  return res.status(201).send(posts[id]);
});

app.post("/events", (req: Request, res: Response) => {
  console.log("Received event", req.body.type);

  return res.send({});
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
