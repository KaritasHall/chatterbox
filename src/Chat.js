import getServerUrl from "./config";
import { useState, useEffect } from "react";
import CatFacts from "./catfacts";

export default function Chat() {
  // DON'T ERASE THIS LINE
  // this is the server url (see config.js)
  const url = getServerUrl();

  //Fetching existing messages from database with GET method
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const messageBox = await fetch(url);
      const data = await messageBox.json();
      setMessage(data);
      console.log(data);
    };
    // Using setInterval to fetch messages every 10s
    const intervalId = setInterval(() => {
      getData();
    }, 10000);
    // Cleanup with clearInterval
    // It makes sure that the interval stops when the component is no longer running
    // For example when the user closes the chat
    return () => {
      clearInterval(intervalId);
    };
  }, [url]);
  //Adding a new messge with post method
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
