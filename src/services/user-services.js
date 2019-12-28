import axios from "axios";
import env from "../environment"

const userURL = `${env.ApiMonthLink}user/`;

class userService {

   static login = (user) => {
        return axios.post(`${userURL}login`, user);
    };


   static register = (user) => {
        return axios.post(`${userURL}register`, user);
    };
}

export default userService;
