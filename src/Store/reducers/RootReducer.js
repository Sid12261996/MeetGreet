import {combineReducers} from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    root : userReducer,
    posts : postReducer,
    profile : profileReducer
});

export default rootReducer;