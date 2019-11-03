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
            userStore.dispatch({type: 'USERS_DATA', result: user});
            this.authenticated = true;
            return true;
        }
        return false;
    }


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

    isAuthenticated() {
        return this.authenticated;
    }

}


export default new Auth();




