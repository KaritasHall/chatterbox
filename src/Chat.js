import "./Chat.css";
import getServerUrl from "./config";
import { useState, useEffect } from "react";
import CatFacts from "./catfacts";
import {
  collection,
  query,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import chatterBoxGreen from "./chatterboxgreen.png";

// Hæ this is a random test

export default function Chat() {
  // DON'T ERASE THIS LINE
  // this is the server url (see config.js)
  const url = getServerUrl();

  //Fetching existing messages from database with GET method
  //Bypassing the server limits your freedom. Talking straight to the database with firebase library. Not using fetch.
  const [message, setMessage] = useState([]);

  useEffect(() => {
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
    //Getting real time updates for messages
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "messages"));
    //OnSnapshot creates a websocket
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      //Sorts the messages to newest on the bottom
      const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

      console.log("The Message", messages);
      // setMessage([...message, { id: message.length, name: text }]);
      setMessage(sortedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //Adding a new message with post method
  const [text, setText] = useState("");
  //these are used in javascriot but are not normally used in react - could use ref hook instead - worked here
  let inputField = document.getElementById("inputField");
  let editField = document.getElementById("editField");

  const sendMsg = () => {
    setMessage([
      ...message,
      { id: message.length, name: text, createdAt: Date.now() },
    ]);
    const bodyData = {
      message: text,
    };
    fetch(url + "chat", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then(console.log);
    inputField.value = "";
    setText("");
  };

  //This makes the enter btn press send - on keypress and handekeypress is also on the input field so they communicate
  let sendBtn = document.getElementById("sendBtn");

  function handleKeyPress(e) {
    console.log(e);
    if (e.key === "Enter") {
      sendBtn.click();
    }
  }

  //Deleting messages
  function deleteMsg(id, i) {
    const msg = [...message];
    msg.splice(i, 1);
    setMessage(msg);
    fetch(url + "chat/" + id, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(console.log);
  }

  //Editing messages
  function editMsg(e, id, i) {
    setshowForm({ ...showForm, [id]: !showForm[id] });
    const edit = [...message];
    edit[i] = { id, name: text };
    setMessage(edit);
    const bodyData = {
      message: text,
      id,
    };
    fetch(url + "chat/" + id, {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then(console.log);
    editField.value = "";
  }

  const el = document.getElementById('messagecontainer');
  // id of the chat container ---------- ^^^
  if (el) {
    el.scrollTop = el.scrollHeight;
  }


  const [showForm, setshowForm] = useState({});

  return (
    <div className="maincontainer">
      <div className="messagecontainer">
      <img src={chatterBoxGreen} alt="Chatterbox logo"></img>
        {message.map((chatMessage, i) => {
          return (
            <div key={chatMessage.id}>
              <div>
                <p className="messagetxt">{chatMessage.name}</p>
              </div>
              <button
                className="deletebtn"
                onClick={() => deleteMsg(chatMessage.id, i)}
              >
                Delete
              </button>

              <button
                className="editbtn"
                onClick={() =>
                  setshowForm({
                    ...showForm,
                    [chatMessage.id]: !showForm[chatMessage.id],
                  })
                }
              >
                Edit
              </button>
              <div>
                {showForm[chatMessage.id] ? (
                  <div>
                    <input
                      className="inputfield"
                      id="editField"
                      onChange={(e) => setText(e.target.value)}
                    ></input>
                    <button
                      className="savebtn"
                      onClick={(e) => editMsg(e, chatMessage.id, i)}
                    >
                      Save
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      

      <div className="sending">
        <input
          className="inputfield"
          id="inputField"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        ></input>
        <button id="sendBtn" onClick={sendMsg} disabled={text.length === 0}>
          Send
        </button>

        <CatFacts />
      </div>
      </div>
    </div>
  );
}
