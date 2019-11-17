const mongo = require('mongoose'),
    Schema = mongo.Schema
;

exports.Entity = {
    CreatedAt: {type: Schema.Types.Date, required: true, default: Date.now()},
    UpdatedAt: {type: Schema.Types.Date, required: true, default: Date.now()},
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
