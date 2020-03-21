import axios from 'axios';
import env from '../environment';
import baseService from "./base-service";
import userStore from "../Store/stores/user-store";

const Url = `${env.ApiLink}`;
baseService.axios = axios.defaults.headers.common['Authorization'] = `bearer ${userStore.getState().root.token}`;
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
