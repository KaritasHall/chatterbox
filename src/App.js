import "./App.css";
import getServerUrl from "./config";
import { useState, useEffect } from "react";
import { getDefaultNormalizer } from "@testing-library/react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import * as firebaseui from "firebaseui";


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
  function deleteMsg(id, i) {
    const msg=[...message]
    msg.splice(i,1)
    setMessage(msg)
    fetch(
      url + "chat/"+id , {
        method: "DELETE"
      }
    )
    .then((r)=>r.json())
    .then(console.log);
  }


  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDrXVF6xm2SOs1fsgf_cUj6jSSriqlsG9g",
    authDomain: "chatroom-69853.firebaseapp.com",
    databaseURL: "https://chatroom-69853-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatroom-69853",
    storageBucket: "chatroom-69853.appspot.com",
    messagingSenderId: "778752590260",
    appId: "1:778752590260:web:874fb6b005663a514472e1"
  };




  useEffect(() => {
  firebase.initializeApp(firebaseConfig);
  // Initialize the FirebaseUI Widget using Firebase.
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'https://mbl.is/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);   
  }, []);





  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
        <div>
          {message.map((chatMessage, i) => { 
            return (
              <div>
                <div key={chatMessage.id}><p>{chatMessage.name}</p></div>
                <button onClick={() => deleteMsg(chatMessage.id, i)}>Delete</button>
              </div>
              )
            })}
      
        </div>
          <input id="inputField" onChange={(e)=>setText(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}></input>
          <button id="sendBtn" onClick={sendMsg}>Send</button>
    </div>
    
  );
}

export default App;