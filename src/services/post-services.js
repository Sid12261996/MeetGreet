import axios from 'axios';
import env from '../environment';

const Url = `${env.ApiLink}`;

class postService {
    static createPost = (userId, data) => {
        return axios.post(`${Url}posts/${userId}/create`, data);
    };

    static getAllPosts = (userId) => {
        return axios.get(`${Url}posts/all`);
    };

    static getPostsByUserId = (userId) => {
        return axios.get(`${Url}posts/${userId}`);
    };
}

export default postService;
