function TollArduinoStatus() {
    var nbPassage = 1380;

    return (
        <div className="section">
            <h1>Status</h1>
            <div>
                <div id="status">
                </div>
                <h3 className="center">Fermé</h3>
            </div>
            <div id="nbPassage">
                <h3 className="center">Passage sur les dernières 24h :</h3>
                <h1>{nbPassage}</h1>
            </div>
        </div>
    );
}

export default TollArduinoStatus;