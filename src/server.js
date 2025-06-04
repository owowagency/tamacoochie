import express from "express";
import { Tamacoochie } from "./game.js";

const tamacoochie = new Tamacoochie();
tamacoochie.start();

const app = express();

app.post("/webhook/slack", (req, res) => {
  const { text, username } = req.body;
  console.log(`Received message from ${username}: ${text}`);

  // Get the initial command with slash (/play)
  const command = text.split(" ")[0].slice(1);

  switch (command) {
    case "play":
      tamacoochie.play(username);
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

app.use(express.json());

app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
