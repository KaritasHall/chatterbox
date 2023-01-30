import getServerUrl from "./config";
import { useState, useEffect } from "react";
import CatFacts from "./catfacts";
import { collection, query, getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";


export default function Chat() {
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


  // DON'T ERASE THIS LINE
  // this is the server url (see config.js)
  const url = getServerUrl();

  //Fetching existing messages from database with GET method
  const [message, setMessage] = useState([]);
  
  useEffect(() => {
    //Getting real time updates for messages
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);  
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
          messages.push({id:doc.id,name:doc.data().name});
      });
      console.log("Message", messages.join(", "));
      // setMessage([...message, { id: message.length, name: text }]);
      setMessage(messages)
    });

    return () => {
      unsubscribe();
    };
  }, [url]);

  //Adding a new message with post method
  const [text, setText] = useState("");

  let inputField = document.getElementById("inputField");
  let editField = document.getElementById("editField");

  const sendMsg = () => {
    setMessage([...message, { id: message.length, name: text }]);
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
  };

  //This makes the enter btn press send - on keypress and handekeypress is also on the input field so they communicate
  let sendBtn = document.getElementById("sendBtn");

  function handleKeyPress(e) {
    console.log(e);
    var key = e.key;
    if (key === "Enter") {
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



  const [showForm, setshowForm] = useState({});

  return (
    <div>
      <div>
        {message.map((chatMessage, i) => {
          return (
            <div key={chatMessage.id}>
              <div>
                <p>{chatMessage.name}</p>
              </div>
              <button onClick={() => deleteMsg(chatMessage.id, i)}>
                Delete
              </button>

              <button
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
                      id="editField"
                      onChange={(e) => setText(e.target.value)}
                    ></input>
                    <button onClick={(e) => editMsg(e, chatMessage.id, i)}>
                      Save
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <input
        id="inputField"
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      ></input>
      <button id="sendBtn" onClick={sendMsg}>
        Send
      </button>

      <CatFacts />
    </div>
  );
}
