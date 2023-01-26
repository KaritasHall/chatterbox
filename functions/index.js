const functions = require("firebase-functions");
require ('dotenv').config();
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

expressApp.get("/", async (req, res) => {
  const snapshot = await db.collection("messages").get();

  const messages = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  res.send(messages);
});

expressApp.post("/chat", async (req, res) => {
  console.log(req.body);
  // save to firebase, reference is saved as ... reference!
  const reference = await db.collection("messages").add({
    name: req.body.message,
  });

  // we use the reference to get a snapshot!
  const snapshot = await reference.get();

  // send the firebase snapshot back to the client!
  res.send({
    id: snapshot.id,
    ...snapshot.data(),
  });
});

// Delete task from to-do list
expressApp.delete("/chat/:id", async (req, res) => {
  const reference = await db.collection("messages").doc(req.params.id).delete();
  console.log("this is the right time", reference);
  // This error handling neeeds to be fixed!
  if (reference) {
    res.send({message:"Message deleted!"});
  } else {
    res.status(500).send("Failed to delete");
  }
});

// Edit comment
expressApp.put("/chat/:id", async (req, res) => {
  await db.collection("messages").doc(req.params.id).update({
    name: req.body.message,
  });

  res.send({
    id: req.params.id,
    name: req.body.message,
  });
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
