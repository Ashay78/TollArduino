
function SubscribePopUp() {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onmessage = (event) => {
        console.log(event)
    }

    function addUser() {
        // Add a user to the database
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const badge = document.getElementById("badge").value;
        
        const data = {firstname: firstname, lastname: lastname, badge: badge};
        ws.send(JSON.stringify({type: 'registration', data: data}))
        
        //document.getElementById('registration').style.opacity = "0";
        //document.getElementById("message").innerHTML = "Veuillez scanner";

        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("badge").value = "";
    }
    
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Utilisateur a inscrire</h2>
                <label htmlFor="name">Prénom : </label>
                <input id="firstname" name="name" type="text"/><br/>
                <label htmlFor="surname">Nom : </label>
                <input id="lastname" name="surname" type="text"/><br/>
                <label htmlFor="badge">Badge : </label>
                <input id="badge" name="badge" type="text"/><br/>
                <button onClick={addUser}>Ajouter</button>
            </div>
        </div>
    );
}

export default SubscribePopUp;