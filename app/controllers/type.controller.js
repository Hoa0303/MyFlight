const TypeService = require("../services/type.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const typeService = new TypeService(MongoBD.client);
        const document = await typeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the type')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const typeService = new TypeService(MongoBD.client);
        documents = await typeService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving type")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const typeService = new TypeService(MongoBD.client);
        const document = await typeService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Type not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving type with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const typeService = new TypeService(MongoBD.client);
        const document = await typeService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Type not found"));
        }
        return res.send({ message: "Type was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating type with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const typeService = new TypeService(MongoBD.client);
        const document = await typeService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Type not found"));
        }
        return res.send({ message: "Type was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete type with id=${req.params.id}`));
    }
};
