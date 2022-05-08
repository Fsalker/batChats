const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let db;

app.use(express.json());
app.use(cors());
// app.use(express.static("assets"));

// [TODO] Move into /routes
app.get("/messages/:chatroomId", async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const messagesCursor = await db.collection("messages").find({ chatroomId });
    const messages = await messagesCursor.toArray();

    const messagesWithAuthors = await Promise.all(
      messages.map(async (msg) => {
        const author = await db
          .collection("authors")
          .findOne({ _id: ObjectId(msg.authorId) });

        return {
          ...msg,
          author,
        };
      })
    );

    // console.log(`Fetched messages from the database: `, messagesWithAuthors);
    res.json(messagesWithAuthors);
  } catch (err) {
    console.log(`An error occurred when GETTING the messages: `, err);
  }
});
app.post("/messages/:chatroomId", async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { authorId, message } = req.body;
    console.log("RECEIVING MESSAGE: ", chatroomId, authorId, message);

    const messageDocument = {
      chatroomId, // [TODO] Actually validate that our JWT has access to this chatroom
      authorId, // [TODO] Actually validate this against the userId stored in our auth token (JWT)
      message,
      createdAt: new Date().getTime(),
    };

    await db.collection("messages").insertOne({ ...messageDocument });

    res.json(messageDocument);
  } catch (err) {
    console.log("An error occurred when POSTING the message:", err);
  }
});

const startServer = async () => {
  try {
    console.log(`Launching app...`);
    const dbURI = `mongodb://localhost:27017/`;
    const mongoClient = new MongoClient(dbURI);

    await mongoClient.connect();
    db = mongoClient.db("batchats");

    // [TODO] [now] Is app.listen async? test it
    await app.listen(port);
    console.log(`Example app listening on port ${port}`);
  } catch (err) {
    console.log(`An error occurred when booting up the server`, err);
  }
};

startServer();

// {
//   name: "Andrei Puiu",
//     icon: "userIcon.png",
// },
// {
//   name: "Somedude McDude",
//     icon: "userIcon.png",
// },

//
// {
//   createdAt: new Date().getTime(),
//     message: "Hey, are you there?",
//   chatroomId: "6262d9ccf1c5f1f53e4b07936262d9ccf1c5f1f53e4b0794"
//   authorId: "6262d9ccf1c5f1f53e4b0793"
// },
// {
//   createdAt: new Date().getTime(),
//     message: "Yep",
//   chatroomId: "6262d9ccf1c5f1f53e4b07936262d9ccf1c5f1f53e4b0794"
//   authorId: "6262d9ccf1c5f1f53e4b0794"
// },
// {
//   createdAt: new Date().getTime(),
//     message: "Great, cheers!",
//   chatroomId: "6262d9ccf1c5f1f53e4b07936262d9ccf1c5f1f53e4b0794"
//   authorId: "6262d9ccf1c5f1f53e4b0793"
// },

//
// // const messagesDb = [
//   {
//     ID: 10,
//     createdAt: new Date().getTime(),
//     message: "Hello world",
//     author: {
//       ID: 125,
//       name: "Andrei Puiu",
//       icon: "userIcon.png",
//     },
//   },
//   {
//     ID: 11,
//     createdAt: new Date().getTime(),
//     message: "This is the second message",
//     author: {
//       ID: 125,
//       name: "Andrei Puiu",
//       icon: "assets/userIcon.png",
//     },
//   },
// ];
