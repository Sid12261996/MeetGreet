import axios from "axios";
import env from "../environment";

const URL = `${env.ImageBaseUrl}`;
const ApiLink = `${env.ApiLink}`;

class imageService {

    static upload = (formData, config) => {
        return axios.post(`${URL}upload`, formData, config);
    };

    static ProfilePic = (userId, PPUrl) => {
        return axios.put(`${ApiLink}user/${userId}/userPicUpdate`, {NewImgUrl: PPUrl});
    };
}

export default imageService;
