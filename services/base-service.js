const entity = require('../models/base-entity');
const baseService = {};
baseService.init = function (instance) {
    this.instance = instance;
};
baseService.add = async function (objectToAdd) {
    return await this.instance.save(objectToAdd);
};
baseService.addMany = async function (objectToAdd) {
    return await this.instance.insertMany(objectToAdd);
};
baseService.delete = async function (id) {
    entity.delete();
    this.instance.findOneAndUpdate({_id:id},{baseEntity:entity})
};
module.exports = baseService;
