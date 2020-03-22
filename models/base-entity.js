const mongo = require('mongoose'),
    moment = require('moment'),
    Schema = mongo.Schema
;

exports.Entity = {
    CreatedAt: {type: Schema.Types.Date, required: true, default: moment.utc().toDate()},
    UpdatedAt: {type: Schema.Types.Date, required: true, default: moment.utc().toDate()},
    DeletedAt: {type: Schema.Types.Date, default: null}
};

exports.update = () => {
    Entity.UpdatedAt = Date.now();
    return Entity;
};
exports.delete = () => {
    Entity.DeletedAt = Date.now();
    return Entity;
};
