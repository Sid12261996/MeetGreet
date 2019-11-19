import {createStore} from 'redux'
import rootReducer from "../reducers/RootReducer";

const userStore = createStore(rootReducer);
export default userStore;
