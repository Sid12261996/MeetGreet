import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.css';
import auth from '../../auth/auth';

class Sidebar extends Component {

    handleLogout = () => {
        auth.logout(()=>{
            this.props.history.push("/");
        });
    };
    render() {
        return (
            <div>
                <div className="Sidebar">
                    <div className="Search">
                        <i class="fas fa-search"></i>
                    </div>
                    <div className="Onlinefriends">
                        <i class="fas fa-users"></i>
                    </div>
                    <div className="Messages">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div className="Notifications">
                        <i class="fas fa-bell"></i>
                    </div>
                    <div className="Logout" onClick={this.handleLogout}>
                        <i class="fas fa-power-off"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);