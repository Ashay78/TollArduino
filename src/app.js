import BadgingList from "./BadgingList";
import TollArduinoStatus from "./TollArduinoStatus";
import UserList from "./UsersList";

function App() {
  return (
    <div className="container">
      <TollArduinoStatus />
      <UserList />
      <BadgingList />
    </div>
  );
}

export default App;
