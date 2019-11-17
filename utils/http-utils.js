const statusCodes = {
    BadRequest: 400,
    NotFound: 404,
    Unauthorized: 401,
    Ok: 200,
    InternalServerError: 500
};

const statusMessages = {
    400: 'Please check the request payloads, resource you are looking is not available currently',
    404: 'resource you are looking for has been changed or not found',
    401: "you are not authorized to access the resource",
    200: "completed successfully",
    500: 'Internal server error! please try again after some time!'
};


const Response = function (requestStatus, data, error) {
    return (req, res) => {
        let message = {error, ...{type: statusMessages[requestStatus]}};
        res.status(requestStatus).json({data, message})
    };
};

exports.Ok = (data) => {
    return Response(statusCodes.Ok, data, undefined)
};
exports.BadRequest = (error) => {
    return Response(statusCodes.BadRequest, undefined, error)
};
exports.NotFound = (data, error) => {
    return Response(statusCodes.NotFound, data, error)
};
exports.UnAuthorized = (data, error) => {
    return Response(statusCodes.Unauthorized, data, error)
};
exports.ServerError = (data, error) => {
    return Response(statusCodes.InternalServerError, data, error)
};
