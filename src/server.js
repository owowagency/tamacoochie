import express from "express";
import { Tamacoochie } from "./game.js";

const tamacoochie = new Tamacoochie();
tamacoochie.start();

const app = express();

// url encoded
app.use(express.urlencoded({ extended: true }));

app.post("/webhook/slack", (req, res) => {
  console.log(req);

  const { text, user_name } = req.body;
  console.log(`Received message from ${user_name}: ${text}`);

  switch (text) {
    case "play":
      tamacoochie.play(user_name);
      break;
    case "revive":
      tamacoochie.reset();
      break;
    default:
      // Handle unknown command
      break;
  }
  res.status(200).send("OK");
});

app.get("/status", (req, res) => {
  const status = tamacoochie.status();
  res.json(status);
});

app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
