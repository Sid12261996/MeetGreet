import axios from "axios";
import env from "../environment"

const URL = `${env.ImageBaseUrl}`;

class imageService {

    static upload = (formData,config) => {
        return axios.post(`${URL}`, formData,config);
    };
}

export default imageService;
