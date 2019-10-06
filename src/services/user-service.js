import axios from "axios";
import env from "../environment"

const userURL = `${env.url}user/`;


class userService {

   static login = (user) => {
       console.log(user);
        return axios.post(`${userURL}login`, user);
        // .then(result => {
        //     console.log(result);
        //     return result;
        // }).catch(err => {
        //     console.log(err);
        // });
    };


   static register = (user) => {
        return axios.post(`${userURL}register`, user);
    };


}

export default userService;
