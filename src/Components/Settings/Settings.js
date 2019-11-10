import React, { Component } from 'react';
import Tabs from '../Tabs/Tabs';
import Helmet from 'react-helmet';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <Helmet>
                <title>Settings</title>
                </Helmet>
                    <h1>Settings</h1>
                    <Tabs />
            </div>
        )
    }
}
