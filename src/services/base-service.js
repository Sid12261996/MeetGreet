import axios from 'axios';
import userStore from "../Store/stores/user-store";

const baseService = {};

baseService.axios = axios.defaults.headers.common['Authorization'] = `bearer ${userStore.getState().root.token}`;
// baseService.axios = axios;

export default baseService
