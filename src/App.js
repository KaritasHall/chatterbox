import "./App.css";
import { useState, useEffect } from "react";
import Auth from "./auth";
import Chat from "./Chat";



function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <div>
    {
    isLoggedIn? <Chat></Chat> : 
      <Auth login={setIsLoggedIn}></Auth>
    }
    </div>
  );
}

export default App;