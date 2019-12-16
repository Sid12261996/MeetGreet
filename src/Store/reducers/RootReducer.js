import {combineReducers} from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
    root : userReducer,
    posts : postReducer
});

export default rootReducer;