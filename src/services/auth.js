class Auth {
    constructor(){
        this.authenticated = false
    }

    login = (cb) => {
        this.authenticated = true;
        return cb();
    }

    logout = (cb) => {
        this.authenticated = false;
        return cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

}

export default new Auth();