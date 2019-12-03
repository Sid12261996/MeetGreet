import React, { Component } from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import Index from './Components/Index/Index';
import Start from './Components/Start/Start';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import NotFound from './Components/404/NotFound';
import {ProtectedRoute} from './services/protected-route';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                <Switch>
                    <Route exact path="/" component={Index} />
                    <ProtectedRoute path="/start" component={Start} />
                    <ProtectedRoute path="/settings" component={Settings} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <Route path="*" component={NotFound} />
                </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;