// This file is for "Differentiating email/password from email link"
// This is useful for identifier-first flows where the user is first asked to provide their email and then presented with the method of sign-in:


import { getAuth, fetchSignInMethodsForEmail, EmailAuthProvider} from "firebase/auth";

// After asking the user for their email.
const email = window.prompt('Please provide your email');

const auth = getAuth();
fetchSignInMethodsForEmail(auth, email)
  .then((signInMethods) => {
    // This returns the same array as fetchProvidersForEmail but for email
    // provider identified by 'password' string, signInMethods would contain 2
    // different strings:
    // 'emailLink' if the user previously signed in with an email/link
    // 'password' if the user has a password.
    // A user could have both.
    if (signInMethods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) != -1) {
      // User can sign in with email/password.
    }
    if (signInMethods.indexOf(EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) != -1) {
      // User can sign in with email/link.
    }
  })
  .catch((error) => {
    // Some error occurred, you can inspect the code: error.code
  });

export default email;