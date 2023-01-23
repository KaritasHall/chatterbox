// This file is for "Linking/re-authentication with email link"
// For example a user previously authenticated with another provider, such as a phone number, can add this method of sign-in to their existing account 
// This is the same as the auth_email_link_link.js just it can also be used to re-authenticate an email link user before running a sensitive operation


import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

// Construct the email link credential from the current URL.
const credential = EmailAuthProvider.credentialWithLink(
  email, window.location.href);

// Re-authenticate the user with this credential.
const auth = getAuth();
reauthenticateWithCredential(auth.currentUser, credential)
  .then((usercred) => {
    // The user is now successfully re-authenticated and can execute sensitive
    // operations.
  })
  .catch((error) => {
    // Some error occurred.
  });

export default credential;