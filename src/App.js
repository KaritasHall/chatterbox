import logo from "./logo.svg";
import "./App.css";
import getServerUrl from "./config";
import actionCodeSettings from "./auth/auth_email_link_actioncode_settings";
import auth from "./auth/auth_email_link_send";
import authcomplete from "./auth/email_link_complete";
import credential from "./auth/auth_email_link_link";
import recredential from "./auth/auth_email_link_reauth";
import email from "./auth/email_link_diferentiate";
import authsignout from "./auth/auth_sign_out";

function App() {
  // DON'T ERASE THIS LINE
  // this is the server url (see config.js)
  const url = getServerUrl();

  // Commands required for auth. firebase
  var firebase = require('firebase');
  var firebaseui = require('firebaseui');
  // Initialize the FirebaseUI Widget using firebase
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // This command adds the email provider ID to the list of FirebaseUI "signInOptions"
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });


  return (
    <div className="App">

    </div>
  );
}

export default App;
