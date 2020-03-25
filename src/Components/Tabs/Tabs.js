import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.css';
import StartLogo from '../Images/mg01.png'
import userStore from "../../Store/stores/user-store";

class Tabs extends Component {
    render() {
        let userData = userStore.getState().root.user;
        return (
            <div>
                <div className="TabContent text-center">
	                <NavLink to={`/${userData._id}/settings`} className="p-3">
                        <h4>Settings</h4>
                    </NavLink>
	                <NavLink to={`/${userData._id}/profile`} className="p-3">
                        <h4>Profile</h4>
                    </NavLink>
                    <NavLink to={`/${userData._id}/start`}>
                        <h4> <img id="startLogo" src={StartLogo} alt="Start"/> </h4>
                    </NavLink>
	                <NavLink to="/community" className="p-3">
                        <h4>Community</h4>
                    </NavLink>
	                <NavLink to="/Friends" className="p-3">
                        <h4>Friends</h4>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Tabs;