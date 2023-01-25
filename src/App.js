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

  //Fetching existing messages from database with GET method
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

//Adding a new messge with post method
  const [text, setText] = useState("");

  let inputField = document.getElementById('inputField')

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
      inputField.value = ""
  }

  //This makes the enter btn press send - on keypress and handekeypress is also on the input field so they communicate 
  let sendBtn = document.getElementById('sendBtn')  

  function handleKeyPress(e) {
    console.log(e)
    var key = e.key;
    if (key === "Enter") {
      sendBtn.click();
    }
  }

  //Deleting messages
  function deleteMsg(id) {
    fetch(
      url + "id", {
        method: "DELETE"
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
      <input id="inputField" onChange={(e)=>setText(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}></input>
      <button id="sendBtn" onClick={sendMsg}>Send</button>
    </div>
  );
}

export default App;