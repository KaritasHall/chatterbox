// This file is for the "Send an authentication link to the user's email address"
// Part two: Send the authentication link to the user's email, and save the user's email in case the user completes the email sign-in on the same device


import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const auth = getAuth();
sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

  export default auth;