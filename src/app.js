import BadgingList from "./BadgingList";
import TollArduinoStatus from "./TollArduinoStatus";
import UserList from "./UsersList";
import React, {useState} from "react";
 
function App() {
  const [badges, setBadges] = useState([])
  const [users, setUsers] = useState([])

  document.onreadystatechange = ev => {
      const ws = new WebSocket('ws://localhost:3001');
  
      ws.onopen = (_) => {
        ws.send(JSON.stringify({type: 'informationRequest'}));
      };

      ws.onmessage = (event) => {
          let dataObject = JSON.parse(event.data);
          if(dataObject.type == "badges"){
            setBadges(dataObject.data);
          }
          else if(dataObject.type == "users"){
            setUsers(dataObject.data);
          }
      }
  }

  return (
    <div className="container">
      <TollArduinoStatus />
      <UserList users={users} />
      <BadgingList badges={badges} />
    </div>
  );
}

export default App;
