import axios from 'axios';
import env from '../environment';

const Url = `${env.ApiMonthLink}`;

class postService {
    static postCreate = (userId,data) => {
        return axios.post(`${Url}posts/${userId}/create`, data);
    };

    static postGet = (userId) => {
        return axios.get(`${Url}posts/${userId}`);
    };
}

export default postService;
