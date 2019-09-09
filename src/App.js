import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Navbar />
                    <Home />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;