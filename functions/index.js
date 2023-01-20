const functions = require("firebase-functions");
// "firebase-functions" is specifically for Firebase's cloud hosting.
// Here I am hosting my server in the cloud
const cors = require("cors");
const express = require("express");
const expressApp = express();
const firebaseAdmin = require("firebase-admin");
/* firebaseAdmin is kind of like PgAdmin*/
// a ton of options, including hosting (which I ended up using in this project)
const bodyParser = require("body-parser");
const { getFirestore } = require("firebase-admin/firestore");
const PORT = 5000;

// Middlewares
expressApp.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }));
expressApp.use(bodyParser.json());

// Firebase app initialization
firebaseAdmin.initializeApp();

// Database reference. Firestore is the actual database, included in Firebase
const db = getFirestore();

expressApp.get("/", async (req, res) => {
  const snapshot = await db.collection("messages").get();

  const todoList = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  res.send(todoList);
});

expressApp.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to PORT: " + PORT);
});
