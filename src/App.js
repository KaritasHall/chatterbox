import "./App.css";
import { useState, useEffect } from "react";
import Auth from "./Auth";
import Chat from "./Chat";

function App() {
  //Setting a state for the login - default state is false (not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* A ternary operator that says is user logged in? if true then he goes to chat if not he goes to auth */}
      {isLoggedIn ? <Chat></Chat> : <Auth login={setIsLoggedIn}></Auth>}
    </div>
  );
}

export default App;
