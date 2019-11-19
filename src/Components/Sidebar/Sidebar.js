import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.css';
import auth from '../../auth/auth';

class Sidebar extends Component {

    handleLogout = () => {
        auth.setAuthenticity(false,null,()=>{
            this.props.history.push("/");
        });
    };
    render() {
        return (
            <div>
                <div className="Sidebar">
                    <div className="Search">
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="Onlinefriends">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="Messages">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="Notifications">
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="Logout" onClick={this.handleLogout}>
                        <i className="fas fa-power-off"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);