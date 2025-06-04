import express from "express";

const app = express();

app.post("/webhook/slack", (req, res) => {
  console.log(req.body);
  res.status(200).send("OK");
});

app.use(express.json());

export default app;
