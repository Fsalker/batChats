const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const messagesDb = [
  {
    ID: 10,
    createdAt: new Date().getTime(),
    message: "Hello world",
    author: {
      ID: 125,
      name: "Andrei Puiu",
      icon: "userIcon.png",
    },
  },
  {
    ID: 11,
    createdAt: new Date().getTime(),
    message: "This is the second message",
    author: {
      ID: 125,
      name: "Andrei Puiu",
      icon: "assets/userIcon.png",
    },
  },
];

app.use(cors());
app.get("/messages", (req, res) => {
  res.json(messagesDb);
});

// app.use(express.static("assets"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
