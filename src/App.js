import "./App.css";
import getServerUrl from "./config";
import { useState, useEffect } from "react";
import { getDefaultNormalizer } from "@testing-library/react";
// import actionCodeSettings from "./auth/auth_email_link_actioncode_settings";
// import auth from "./auth/auth_email_link_send";
// import authcomplete from "./auth/email_link_complete";
// import credential from "./auth/auth_email_link_link";
// import recredential from "./auth/auth_email_link_reauth";
// import email from "./auth/email_link_diferentiate";
// import authsignout from "./auth/auth_sign_out";

function App() {
  // DON'T ERASE THIS LINE
  // this is the server url (see config.js)
  const url = getServerUrl();

  const [message, setMessage] = useState([]);

  useEffect(() =>{
    const getData = async ()=> {
    const messageBox = await fetch (url)
    const data = await messageBox.json();
    setMessage(data)
    console.log(data)
  }
    getData();
  }
,[])


  const [text, setText] = useState("");

  const sendMsg = () => {
    setMessage([...message, {id:message.length, name:text}])
    const bodyData = {
      message: text
    }
    fetch(
      url + "chat",
      {
        method:"POST",
        body: JSON.stringify(bodyData),
        headers:{ 'content-type':'application/json', 'accept':'application/json' }
      }
    )
      .then((r)=>r.json())
      .then(console.log);
  }





  // Commands required for auth. firebase
  // var firebase = require('firebase');
  // var firebaseui = require('firebaseui');
  // Initialize the FirebaseUI Widget using firebase
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // This command adds the email provider ID to the list of FirebaseUI "signInOptions"
  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID
  //   ],
  //   // Other config options...
  // });


  return (
    <div className="App">
      <div>
        {message.map((chatMessage) => { 
          return (
            <div key={chatMessage.id}><p>{chatMessage.name}</p></div>
          )
        })}
      </div>
      <input onChange={(e)=>setText(e.target.value)}></input>
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default App;