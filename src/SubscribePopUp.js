
function SubscribePopUp() {
    function addUser() {
        const ws = new WebSocket('ws://localhost:3001');

        // Add a user to the database
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const badge = document.getElementById("badge").value;
        
        const data = {firstname: firstname, lastname: lastname, badge: badge};
        ws.onopen = () => {
            ws.send(JSON.stringify({type: 'registration', data: data}))
        }
        
        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("badge").value = "";
    }

    function hidePopUp() { 
        document.getElementById('registration-popup').style.display = 'none';
    }
    
    return (
        <div id="registration-popup" className="popup">
            <div className="popup-content">
                <h2>Utilisateur a inscrire</h2>
                <label htmlFor="name">Prénom : </label>
                <input id="firstname" name="name" type="text"/><br/>
                <label htmlFor="surname">Nom : </label>
                <input id="lastname" name="surname" type="text"/><br/>
                <label htmlFor="badge">Badge : </label>
                <input id="badge" name="badge" type="text"/><br/>
                <button onClick={addUser}>Ajouter</button><br/>
                <button onClick={hidePopUp}>Annuler</button>
            </div>
        </div>
    );
}

export default SubscribePopUp;