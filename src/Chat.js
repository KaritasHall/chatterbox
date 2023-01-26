import getServerUrl from "./config";
import { useState, useEffect } from "react";


export default function Chat() {
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
      url + "chat/"+id , 
      {
        method: "DELETE"
      }
    )
    .then((r)=>r.json())
    .then(console.log);
  }


  function editMsg(e, id) {
    const bodyData = {
      message: text, id
    }
    fetch(
      url + "chat/" +id,
      {
        method:"PUT",
        body: JSON.stringify(bodyData),
        headers:{ 'content-type':'application/json', 'accept':'application/json' } 
      }
    )
      .then((r)=>r.json())
      .then(console.log);
  }

  const [showForm, setshowForm] = useState({})

  return(
    <div>
      <div>
        {message.map((chatMessage, i) => { 
          return (
            <div>
              <div key={chatMessage.id}><p>{chatMessage.name}</p></div>
              <button onClick={() => deleteMsg(chatMessage.id, i)}>Delete</button>

              <button onClick={() => setshowForm({...showForm,[message.id]:!showForm[message.id]})}>Edit</button>
              <div>{showForm[message.id]?<div><input onChange={(e) => setText(e.target.value)} id={message.id}>
                </input><button onClick={(e) => editMsg(e,chatMessage.id)}>Save</button></div>:null}</div>

            </div>
            )
          })}
    
      </div>
        <input id="inputField" onChange={(e)=>setText(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}></input>
        <button id="sendBtn" onClick={sendMsg}>Send</button>
  </div>
  
);

}