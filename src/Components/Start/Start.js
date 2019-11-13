import React, { Component } from 'react';
import './Start.css';
import {connect} from 'react-redux';
import userStore from "../../Store/stores/user-store";
import Tabs from '../Tabs/Tabs';
import Helmet from "react-helmet";
import Sidebar from '../Sidebar/Sidebar';

class Start extends Component {
    render() {

        let userData = userStore.getState().user;
        return (
            <div>
                <Helmet>
                    <title>Start</title>
                </Helmet>
                <div className="welcome">
                    <h1>{userData.Name}</h1>
                    <h1>{userData.Email}</h1>
                </div>
                <div className="start">
                    <div className="mainContent">
                        <h1>This is for the News Feeds</h1>
                    </div>
                    <Sidebar className="sidesbar"/>
                </div>
                <Tabs />
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
