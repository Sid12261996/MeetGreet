import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.css';
import StartLogo from '../Images/mg01.png'
import { connect } from 'react-redux';
import store from "../../Store/stores/user-store";

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData : {}
        }
    }

    componentDidMount() {
        let userData = store.getState().root.user;
        this.setState({
            ...this.state,
            userData: userData
        });
    }

    render() {
        return (
            <div>
                <div className="TabContent text-center">
	                <NavLink to={`/${this.state.userData._id}/settings`} className="p-3">
                        <h4>Settings</h4>
                    </NavLink>
	                <NavLink to={`/${this.state.userData._id}/profile`} className="p-3">
                        <h4>Profile</h4>
                    </NavLink>
                    <NavLink to={`/${this.state.userData._id}/start`}>
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

const mapStateToProps = (state) => {
    const {user} = state.root;
    return {user}
}

const mapDispatchToProps = (dispatch) => {
    return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(Tabs);