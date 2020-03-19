import axios from "axios";
import env from "../environment"

const userURL = `${env.ApiLink}user/`;
// const localUrl = `${env.url}user/`;

class userService {

    // On Development, Comment the MGLink
    // Before pushing on Cloud, Comment the url2
    // static LoadUrl = `${env.url2}`;
    static LoadUrl = `${env.MGLink}`;


   static login = (user) => {
        return axios.post(`${userURL}login`, user);
    };


   static register = (user) => {
        return axios.post(`${userURL}register`, user);
    };

   static fetchData = (userid) => {
       return axios.get(`${userURL}${userid}/fetchUserData`);
   };
}

export default userService;
