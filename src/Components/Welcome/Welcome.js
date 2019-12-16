import React from 'react';
import './Welcome.css';
import userStore from "../../Store/stores/user-store";

function Welcome() {
    let userData = userStore.getState().root.user;      //GETTING USER DETAILS
    return (
        <div className="welcome">
        {/* WELCOME SCREEN */}
            <div className="welcome-content">
                <h1>{userData.Name}</h1>
                <h1>{userData.Email}</h1>
            </div>
        </div>
    )
}

export default Welcome;