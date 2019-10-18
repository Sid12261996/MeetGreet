class Auth {
    constructor() {
        this.authenticated = false;
        this.isCacheSet()
    }

    isCacheSet() {
        let token = PlayingWithCache.getCache('token');
        if (token) {
            let user = JSON.stringify(PlayingWithCache.getCache('user'));
            // Todo: call the reducer and load the value from user
            this.authenticated = true;
            return true;
        }
        return false;
    }

    //Todo: change the name of this function to some generic name as setAuthenticity() where 2nd parameter accepts true or false and set authentication factor, No need of logout
    setAuthenticity = (authenticity, result, cb) => {
        this.authenticated = authenticity;
        if (authenticity) {
            PlayingWithCache.setCache('user', result.currentUser);
            PlayingWithCache.setCache('token', result.token);
        } else {
            PlayingWithCache.removeCache();
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

export default new Auth();
