function TollArduinoStatus() {
    var nbPassage = 1380;

    var weeklyStat = [
        110,
        200,
        50,
        60,
        357,
        204,
        632
    ]

    var max = Math.max(...weeklyStat);
    
    var pourcents = weeklyStat.map(x => {
        return x*100/max;
    });

    console.log(pourcents);
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
            <div id="GraphWeek">
                <h3 className="center">Passage sur la dernière semaine :</h3>
                <div id="weeklyStat">
                    <div style={{height: `${pourcents[0]}%`}}><span>{weeklyStat[0]}</span></div>
                    <div style={{height: `${pourcents[1]}%`}}><span>{weeklyStat[1]}</span></div>
                    <div style={{height: `${pourcents[2]}%`}}><span>{weeklyStat[2]}</span></div>
                    <div style={{height: `${pourcents[3]}%`}}><span>{weeklyStat[3]}</span></div>
                    <div style={{height: `${pourcents[4]}%`}}><span>{weeklyStat[4]}</span></div>
                    <div style={{height: `${pourcents[5]}%`}}><span>{weeklyStat[5]}</span></div>
                    <div style={{height: `${pourcents[6]}%`}}><span>{weeklyStat[6]}</span></div>
                </div>
            </div>
        </div>
    );
}

export default TollArduinoStatus;