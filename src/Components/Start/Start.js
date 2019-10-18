import React, { Component } from 'react';
import auth from '../../services/auth';
import './Start.css';
import {connect} from 'react-redux';

class Start extends Component {
    handleLogout = () => {
        auth.logout(()=>{
            this.props.history.push("/");
        });
    };
    render() {
        console.log(this.props);
        let userData = this.props.user;
        return (
            <div>
                <h1>{userData.Name}</h1>
                <h1>{userData.Email}</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.root.user
    }
};

export default connect(mapStateToProps)(Start);
