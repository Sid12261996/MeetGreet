import React from 'react';
import ReactDOM from 'react-dom';
// import SplashScreen from './Components/SplashScreen/SplashScreen'
// {lazy, Suspense}
import {createStore} from "redux";
import {Provider} from 'react-redux';
import App from './App';
import rootReducer from "./Store/reducers/RootReducer";

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// todo: environment.js file needs to be cleansed up urgently
