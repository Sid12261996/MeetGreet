import React, { Component } from 'react';
import auth from '../../services/auth';

export default class Start extends Component {
    handleLogout = () => {
        auth.logout(()=>{
            this.props.history.push("/");
        });
    }
    render() {
        return (
            <div>
                <h1>Inside</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}
