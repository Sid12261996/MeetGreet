import React, { Component } from 'react'

export default class Start extends Component {
    handleLogout = () => {
        this.props.history.replace("/");
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
