import userStore from "../Store/stores/user-store";

class PlayingWithCache {
    static setCache(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));

        } catch (e) {
            console.error('Could not write cache please check the error and try again', e)
        }
    }

    static removeCache(key) {
        if (key == null)
            localStorage.clear();
        else localStorage.removeItem(key);
    }


    static getCache(key) {
        try {
            return localStorage.getItem(key);

        } catch (e) {
            console.error('Could not retrieve cache check the error:', e)
        }
    }
}





class Auth extends PlayingWithCache {
    constructor() {
        super();
        this.authenticated = false;
        this.isCacheSet()
    }

    isCacheSet() {
        let token = Auth.getCache('token');
        if (token) {
            let user = JSON.parse(Auth.getCache('user'));
            // Todo: call the reducer and load the value from user
            console.log(user);
            userStore.dispatch({type: 'USERS_DATA', result: user});
            console.log(userStore.getState())
            this.authenticated = true;
            return true;
        }
        return false;
    }

    //Todo: change the name of this function to some generic name as setAuthenticity() where 2nd parameter accepts true or false and set authentication factor, No need of logout
    setAuthenticity = (authenticity, result, cb) => {
        this.authenticated = authenticity;
        if (authenticity) {
            Auth.setCache('user', result.data.currentUser);
            Auth.setCache('token', result.data.token);
        } else {
            Auth.removeCache();
        }
        return cb();
    };
//Todo: define the callback here , so that we can add our own middlewares standing common to all
    logout = (cb) => {
        this.authenticated = false;
        return cb();
    };

    isAuthenticated() {
        return this.authenticated;
    }

}


export default new Auth();




