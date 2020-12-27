import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

interface Events {
  type: string;
  data: any;
}

const events: Events[] = [];

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);

  return res.send({ status: "OK" });
});

app.get("/events", (req: Request, res: Response) => {
  return res.send(events);
});

app.listen(4005, () => {
  console.log("Server started on port 4005");
});
