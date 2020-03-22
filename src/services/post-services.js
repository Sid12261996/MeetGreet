import env from '../environment';
import baseService from "./base-service";

const Url = `${env.ApiLink}`;
const axios = baseService.axios();
// const axios = baseService.axios;

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
