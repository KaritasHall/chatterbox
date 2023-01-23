// This file is for "Linking/re-authentication with email link"
// For example a user previously authenticated with another provider, such as a phone number, can add this method of sign-in to their existing account 


import { getAuth, linkWithCredential, EmailAuthProvider } from "firebase/auth";

// Construct the email link credential from the current URL.
const credential = EmailAuthProvider.credentialWithLink(
  email, window.location.href);

// Link the credential to the current user.
const auth = getAuth();
linkWithCredential(auth.currentUser, credential)
  .then((usercred) => {
    // The provider is now successfully linked.
    // The phone user can now sign in with their phone number or email.
  })
  .catch((error) => {
    // Some error occurred.
  });

export default credential;