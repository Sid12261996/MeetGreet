import axios from 'axios';
import store from "../Store/stores/user-store";

const baseService = {
    axios: () => {
        axios.defaults.headers.common['Authorization'] = `bearer ${store.getState().root.token}`;
        return axios;
    }
};


export default baseService
