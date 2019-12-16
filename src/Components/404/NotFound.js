import React, { Component } from 'react';
import './NotFound.css';
import Helmet from "react-helmet";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Page Error</title>
                </Helmet>
                <h1>404 Page Not Found</h1>
            </div>
        )
    }
}
