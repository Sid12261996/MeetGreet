import env from "../environment"
import baseService from "./base-service";

const userURL = `${env.ApiLink}user/`;
const axios = baseService.axios();

class userService {
    static LoadUrl = `${env.MGLink}`;

    static login = (user) => {
        return axios.post(`${userURL}login`, user);
    };


    static register = (user) => {
        console.log(user);
        return axios.post(`${userURL}register`, user);
    };

    static fetchData = (userid) => {
        return axios.get(`${userURL}${userid}/fetchUserData`);
    };
}

export default userService;
