const functions = require("firebase-functions");
require("dotenv").config();
// "firebase-functions" is specifically for Firebase's cloud hosting.

const cors = require("cors");
const express = require("express");
const expressApp = express();
const firebaseAdmin = require("firebase-admin");
/* firebaseAdmin is kind of like PgAdmin*/

const bodyParser = require("body-parser");
const { getFirestore } = require("firebase-admin/firestore");

// Middlewares
expressApp.use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));
expressApp.use(bodyParser.json());

// Firebase app initialization
firebaseAdmin.initializeApp();

// Database reference
const db = getFirestore();

// GET
expressApp.get("/", async (req, res) => {
  try {
    // First we get the record
    const snapshot = await db.collection("messages").get();
    // map through collection and get message by id and other properties
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        createdAt: doc.createTime,
        ...doc.data(),
      };
    });

    res.send(messages);
  } catch (error) {
    console.log("get /", error);
    res.send(500, "Server error");
  }
});

// POST (create new)
expressApp.post("/chat", async (req, res) => {
  try {
    // We don't want the user to post an empty message
    // If they do, they will get an error back
    const message = req.body.message;
    if (message.length === 0) {
      res.send(400, "Message can not be empty");
      // If message is ok then we:
    } else {
      // save to firebase as a reference
      const reference = await db.collection("messages").add({
        name: message,
      });

      // we use the reference to get a snapshot!
      const snapshot = await reference.get();

      // send the firebase snapshot back to the client!
      res.send({
        id: snapshot.id,
        ...snapshot.data(),
      });
    }
  } catch (error) {
    console.log("post /chat", error);
    res.send(500, "Server error");
  }
});

// DELETE
expressApp.delete("/chat/:id", async (req, res) => {
  try {
    // First we get message by id
    const reference = await db.collection("messages").doc(req.params.id).get();
    // If it exists in the database, then we can delete
    if (reference.exists) {
      await db.collection("messages").doc(req.params.id).delete();
      res.send({ message: "Message deleted!" });
    } else {
      res.status(404).send("chat not found");
    }
  } catch (error) {
    console.log("delete /chat/:id", error);
    res.send(500, "Server error");
  }
});

// PUT (edit)
expressApp.put("/chat/:id", async (req, res) => {
  try {
    // We don't want the user to be able to send an empty message
    // So first we check if message is empty
    const message = req.body.message;
    if (message.length === 0) {
      res.send(400, "Message can not be empty");
    } else {
      // If message is not empty then we check for matching id
      const reference = await db
        .collection("messages")
        .doc(req.params.id)
        .get();
      // If it matches then we return the updated message
      if (reference.exists) {
        await db.collection("messages").doc(req.params.id).update({
          name: req.body.message,
        });
        res.send({
          id: req.params.id,
          name: req.body.message,
        });
        // If unsuccessful send error
      } else {
        res.status(404).send("Couldn't edit message");
      }
    }
  } catch (error) {
    console.log("put /chat/:id", error);
    res.send(500, "Server error");
  }
});

// GET random cat fact
expressApp.get("/cats", async (req, res) => {
  try {
    // First we get the record
    const snapshot = await db.collection("cats").get();
    // map through collection and get message by id and other properties
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.send(messages);
  } catch (error) {
    console.log("get /", error);
    res.send(500, "Server error");
  }
});

// Here we are asking express to handle crud operations and
// send a response back to the user
exports.app = functions.https.onRequest(expressApp);

// Firebase is controlling the port etc. behind the scenes.
// You can think of Firebase as the bouncer of a club,
// while express greets the guests and shows them to their seat

// Use "npm run local" to fire up server locally
// Url for local server:
// http://localhost:5000/chatroom-69853/us-central1/app
// Url for cloud server:
// https://us-central1-chatroom-69853.cloudfunctions.net/app
