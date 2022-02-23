import BadgingList from "./BadgingList";
import TollArduinoStatus from "./TollArduinoStatus";
import UserList from "./UsersList";
import React, { useState } from "react";

function App() {
  const [badges, setBadges] = useState([])
  const [users, setUsers] = useState([])

  function refreshData() {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = (_) => {
      ws.send(JSON.stringify({ type: 'informationRequest' }));
    };

    ws.onmessage = (event) => {
      let dataObject = JSON.parse(event.data);
      if (dataObject.type == "badges") {
        setBadges(dataObject.data);
      }
      else if (dataObject.type == "users") {
        setUsers(dataObject.data);
      }
      else if (dataObject.type == "registrationNeeded") {
        console.log(dataObject);

        if (true/* Todo : if registration needed*/){
          document.getElementById('registration-popup').style.display = 'flex';
          // + Add the badge id
        }
        else
          document.getElementById('registration-popup').style.display = 'none';
      }
      else if (dataObject.type == "changeState") {
        if (dataObject.data == "red") {
          document.getElementById('status').classList.remove('green')
          document.getElementById('status').classList.add('red')
        } else {
          document.getElementById('status').classList.remove('red')
          document.getElementById('status').classList.add('green')
        }
      }
    } 
  }

  function showRegistrationForm() {
    document.getElementById('registration-popup').style.display = 'flex';
  }

  document.onreadystatechange = ev => {
    refreshData();
  }

  return (
    <div className="container">
      <TollArduinoStatus />
      <UserList users={users} />
      <BadgingList badges={badges} />
      <div id='debug-buttons'>
        <div id="refresh-button" onClick={refreshData}>
          refresh
        </div>
        <div id="registration-button" onClick={showRegistrationForm}>
          Inscrire un utilisateur
        </div>
      </div>
    </div>
  );
}

export default App;
