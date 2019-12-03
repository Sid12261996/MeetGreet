import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.css';
import StartLogo from '../Images/mg01.png'

class Tabs extends Component {
    render() {
        return (
            <div>
                <div className="TabContent text-center">
	                <NavLink to="/settings" className="p-3">
                        <h4>Settings</h4>
                    </NavLink>
	                <NavLink to="/profile" className="p-3">
                        <h4>Profile</h4>
                    </NavLink>
                    <NavLink to="/start">
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