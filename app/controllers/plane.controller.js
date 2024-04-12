const PlaneService = require("../services/plane.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const planeService = new PlaneService(MongoBD.client);
        const document = await planeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the plane')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const planeService = new PlaneService(MongoBD.client);
        documents = await planeService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving plane")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const planeService = new PlaneService(MongoBD.client);
        const document = await planeService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Plane not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving plane with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const planeService = new PlaneService(MongoBD.client);
        const document = await planeService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating book with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const planeService = new PlaneService(MongoBD.client);
        const document = await planeService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Plane not found"));
        }
        return res.send({ message: "Plane was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete plane with id=${req.params.id}`));
    }
};