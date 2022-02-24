import BadgingList from "./BadgingList";
import TollArduinoStatus from "./TollArduinoStatus";
import UserList from "./UsersList";
import React, { useState } from "react";

function App() {
  const [badges, setBadges] = useState([])
  const [users, setUsers] = useState([])
  const [weeklyStat, setWeeklyStat] = useState([])

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
        if (true/* Todo : if registration needed*/){
          document.getElementById('registration-popup').style.display = 'flex';
          document.getElementById('badge').value = dataObject.data;
        }
        else
          document.getElementById('registration-popup').style.display = 'none';
      }
      else if (dataObject.type == 'changeState') {
        console.log('la')
        if (dataObject.data == "red") {
          document.getElementById('status').classList.remove('green')
          document.getElementById('status').classList.add('red')
        } else {
          console.log('ici')
          document.getElementById('status').classList.remove('red')
          document.getElementById('status').classList.add('green')
        }
      }
      else if (dataObject.type == 'weeklyStat'){
        setWeeklyStat(dataObject.data);
      }
    } 
  }

  function showRegistrationForm() {
    document.getElementById('registration-popup').style.display = 'flex';
  }

  document.onreadystatechange = _ => {
    refreshData();
  }

  return (
    <div className="container">
      <TollArduinoStatus nbPassage24h={badges.length} weeklyStat={weeklyStat}/>
      <UserList users={users} />
      <BadgingList badges={badges} />
      <div id='debug-buttons'>
        <div id="refresh-button" onClick={refreshData}>
          Refresh
        </div>
        <div id="registration-button" onClick={showRegistrationForm}>
          Inscription
        </div>
      </div>
    </div>
  );
}

export default App;
