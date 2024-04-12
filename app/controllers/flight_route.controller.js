const FlightRouteService = require("../services/flight_route.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const flightrouteService = new FlightRouteService(MongoBD.client);
        const document = await flightrouteService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the route')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const flightrouteService = new FlightRouteService(MongoBD.client);
        documents = await flightrouteService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving route")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const flightrouteService = new FlightRouteService(MongoBD.client);
        const document = await flightrouteService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Route not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving route with id=${req.params.id}`));
    }
};

exports.findroute = (req, res) => {
    res.send({ message: "find route by payload" });
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const flightrouteService = new FlightRouteService(MongoBD.client);
        const document = await flightrouteService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "route not found"));
        }
        return res.send({ message: "route was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating route with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const flightrouteService = new FlightRouteService(MongoBD.client);
        const document = await flightrouteService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Route not found"));
        }
        return res.send({ message: "Route was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete route with id=${req.params.id}`));
    }
};