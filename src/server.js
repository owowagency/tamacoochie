import express from "express";

const listen = function (tamacoochieInstance) {
  const app = express();

  app.post("/webhook/slack", (req, res) => {
    const { text, username } = req.body;
    console.log(`Received message from ${username}: ${text}`);

    // Get the initial command with slash (/play)
    const command = text.split(" ")[0].slice(1);

    switch (command) {
      case "play":
        tamacoochieInstance.play(username);
        break;
      default:
        // Handle unknown command
        break;
    }
    res.status(200).send("OK");
  });

  app.use(express.json());

  app.listen(80, () => {
    console.log(`Server listening on port 80`);
  });
};

export default listen;
