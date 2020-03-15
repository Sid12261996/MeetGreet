import axios from "axios";
import env from "../environment";

const URL = `${env.ImageBaseUrl}`;
const ApiLink = `${env.url}`;

class imageService {

    static upload = (formData,config) => {
        return axios.post(`${URL}`, formData,config);
    };

    static ProfilePic = (userId,PPUrl) => {
        return axios.post(`${ApiLink}user/${userId}/${PPUrl}/userPicUpdate`);
    };
}

export default imageService;
