import env from "../environment";
import baseService from "./base-service";

const URL = `${env.ImageBaseUrl}`;
const ApiLink = `${env.ApiLink}`;
// baseService.axios = axios.defaults.headers.common['Authorization'] = `bearer ${userStore.getState().root.token}`;
const axios = baseService.axios();

class imageService {

    static upload = (formData, config) => {
        return axios.post(`${URL}upload`, formData, config);
    };

    static ProfilePic = (userId, PPUrl) => {
        return axios.put(`${ApiLink}user/${userId}/userPicUpdate`, {NewImgUrl: PPUrl});
    };
}

export default imageService;
