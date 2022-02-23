function BadgingList(props) {
    return (
        <div className="section">
            <h1>Passage récent</h1>
            <div className="item-list">
                {props.badges.map((badge) => {
                    return (
                        <div className="item">
                            <h4>{badge.user.firstname} {badge.user.lastname} : {new Date(badge.date).toLocaleString()}</h4>
                            <p>badge n°{badge.user.badge}</p>
                        </div> 
                    )
                })}
            </div>
        </div>
    );
}

export default BadgingList;