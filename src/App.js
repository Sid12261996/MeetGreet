import React, { Component } from 'react';
import {Route,  BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Start from './Components/Start/Start';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Route exact path="/" component={Navbar} />
                    <Route exact path="/" component={Home} />
                    <Route path="/start" component={Start} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;