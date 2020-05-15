import env from "../environment";
import baseService from "./base-service";

const URL = `${env.ImageBaseUrl}`;
const ApiLink = `${env.ApiLink}`;
const axios = baseService.axios();

class imageService {

    static upload = (formData, config) => {
        return axios.post(`${URL}upload`, formData, config);
    };

    static ProfilePic = (userId, PPUrl) => {
        return axios.put(`${ApiLink}user/${userId}/userPicUpdate`, {NewImgUrl: PPUrl});
    };

    static CoverPic = (userId, CPUrl) => {
        return axios.put(`${ApiLink}user/${userId}/coverPicUpdate`, {NewCoverUrl: CPUrl});
    };
}

export default imageService;
