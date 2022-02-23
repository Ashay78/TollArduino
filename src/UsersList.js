function UserList(props) {
    return (
        <div className="section">
            <h1>Utilisateurs inscrits</h1>
            <div className="item-list">
                {props.users.map((user) => {
                    return (
                        <div className="item">
                            <h4>{user.firstname} {user.lastname}</h4>
                            <p>badge n°{user.badge}</p>
                        </div> 
                    )
                })}
            </div>
        </div>
    );
}

export default UserList;