import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import './Profile.css';
import Helmet from 'react-helmet';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Profile</title>
                </Helmet>
                <h1>Profile</h1> 
                <Tabs />
            </div>
        )
    }
}
