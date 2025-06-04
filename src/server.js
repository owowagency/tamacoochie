import express from "express";

const listen = function (tamacoochieInstance) {
  const app = express();

  app.post("/webhook/slack", (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
  });

  app.use(express.json());

  app.listen(80, () => {
    console.log(`Server listening on port 80`);
  });
};

export default listen;
