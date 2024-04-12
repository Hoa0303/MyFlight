const AirLineService = require("../services/airline.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const airlineService = new AirLineService(MongoBD.client);
        const document = await airlineService.create(req.body);
        return res.send(document);
    } catch (errer) {
        return next(
            new ApiError(500, "An error occurred while creating the airline ")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const airlineService = new AirLineService(MongoBD.client);
        documents = await airlineService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving arilines")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const airlineService = new AirLineService(MongoBD.client);
        const document = await airlineService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "airline not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving airline with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const airlineService = new AirLineService(MongoBD.client);
        const document = await airlineService.update(req.params.id, req.body);
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
        const airlineService = new AirLineService(MongoBD.client);
        const document = await airlineService.delete(req.params.id);
        if (!document) {
            return next(new (404, "airline not found"));
        }
        return res.send({ message: "AirLine was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete airline with id=${req.params.id}`));
    }
};