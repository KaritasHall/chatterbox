import { useState, useEffect } from "react";
import { getDefaultNormalizer } from "@testing-library/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import * as firebaseui from "firebaseui";

//Login is the prop with the use state in app.js
export default function Auth({ login }) {
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDrXVF6xm2SOs1fsgf_cUj6jSSriqlsG9g",
    authDomain: "chatroom-69853.firebaseapp.com",
    databaseURL:
      "https://chatroom-69853-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatroom-69853",
    storageBucket: "chatroom-69853.appspot.com",
    messagingSenderId: "778752590260",
    appId: "1:778752590260:web:874fb6b005663a514472e1",
  };

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          //Here we're changing the state to true so when the user is logged in they get sent to chat
          login(true);
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      // signInSuccessUrl: 'https://mbl.is/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </>
  );
}
