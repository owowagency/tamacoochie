import express from "express";
import { Tamacoochie } from "./game.js";

const tamacoochie = new Tamacoochie();
tamacoochie.start();

const app = express();

app.use(express.json());

app.post("/webhook/slack", (req, res) => {
  console.log(req.body);

  const { text, user_name } = req.body;
  console.log(`Received message from ${user_name}: ${text}`);

  // Get the initial command with slash (/play)
  const command = text.split(" ")[0].slice(1);

  switch (command) {
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
