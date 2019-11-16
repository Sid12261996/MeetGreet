const response = require('../utils/http-utils');

exports.Create = (post) => {
    return response.UnAuthorized(post, null);
};

exports.getAll = () => {
    return response.Ok('Getting all the post', null);
};

exports.get = (id) => {
    return response.Ok('Get the post of Id ' + id, null);
};
