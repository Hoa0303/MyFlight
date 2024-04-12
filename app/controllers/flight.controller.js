const FlightService = require("../services/flight.service");
const AirPortService = require("../services/airport.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const flightService = new FlightService(MongoBD.client);
        const document = await flightService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the flight')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const flightService = new FlightService(MongoBD.client);
        documents = await flightService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving flight")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const flightService = new FlightService(MongoBD.client);
        const document = await flightService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Flight not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving flight with id=${req.params.id}`));
    }
};

// exports.findFlight = async (req, res, next) => {
//     try {
//         const flightService = new FlightService(MongoBD.client); // Tạo một instance của FlightService
//         const airportService = new AirPortService(MongoBD.client);
//         const document = await flightService.findFlightByAirports(req.body); // Gọi phương thức findFlightByAirports với payload từ req.body
//         if (document) {
//             return res.send(document); // Trả về kết quả nếu tìm thấy mã tuyến
//         } else {
//             return res.status(404).send("Không tìm thấy mã tuyến."); // Trả về mã 404 nếu không tìm thấy mã tuyến
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An errer occured while retrieving flight")
//         ); // Bắt lỗi và chuyển giao cho middleware xử lý lỗi
//     }
// }

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const flightService = new FlightService(MongoBD.client);
        const document = await flightService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Flight not found"));
        }
        return res.send({ message: "Flight was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Flight with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const flightService = new FlightService(MongoBD.client);
        const document = await flightService.delete(req.params.id);
        if (!document) {
            return next(new (404, "FLight not found"));
        }
        return res.send({ message: "Flight was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete flight with id=${req.params.id}`));
    }
};