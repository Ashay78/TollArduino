function TollArduinoStatus(props) {    
    var max = Math.max(...props.weeklyStat);
    
    var pourcents = props.weeklyStat.map(x => {
        return x*100/max;
    });

    console.log(pourcents);
    return (
        <div className="section">
            <h1>Status</h1>
            <div>
                <div id="status" className="red">
                </div>
                <h3 className="center">Fermé</h3>
            </div>
            <div id="nbPassage">
                <h3 className="center">Passage sur les dernières 24h :</h3>
                <h1>{props.nbPassage24h}</h1>
            </div>
            <div id="GraphWeek">
                <h3 className="center">Passage sur la dernière semaine :</h3>
                <div id="weeklyStat">
                    <div style={{height: `${pourcents[0]}%`}}><span>{props.weeklyStat[0]}</span></div>
                    <div style={{height: `${pourcents[1]}%`}}><span>{props.weeklyStat[1]}</span></div>
                    <div style={{height: `${pourcents[2]}%`}}><span>{props.weeklyStat[2]}</span></div>
                    <div style={{height: `${pourcents[3]}%`}}><span>{props.weeklyStat[3]}</span></div>
                    <div style={{height: `${pourcents[4]}%`}}><span>{props.weeklyStat[4]}</span></div>
                    <div style={{height: `${pourcents[5]}%`}}><span>{props.weeklyStat[5]}</span></div>
                    <div style={{height: `${pourcents[6]}%`}}><span>{props.weeklyStat[6]}</span></div>
                </div>
            </div>
        </div>
    );
}

export default TollArduinoStatus;