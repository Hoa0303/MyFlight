const AirPortService = require("../services/airport.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const airportService = new AirPortService(MongoBD.client);
        const document = await airportService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the airport')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const airportService = new AirPortService(MongoBD.client);
        documents = await airportService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving Airport")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const airportService = new AirPortService(MongoBD.client);
        const document = await airportService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Airport not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving airport with id=${req.params.id}`));
    }
};

// exports.findAirport = async (req, res, next) => {
//     try {
//         const airportService = new AirPortService(MongoBD.client); // Tạo một instance của AirPortService
//         const airportName = await airportService.findAirPortNameByLocal(req.body); // Gọi phương thức findAirPortNameByLocal với local từ req.body
//         if (airportName) {
//             return res.send(airportName); // Trả về kết quả nếu tìm thấy tên sân bay
//         } else {
//             return res.status(404).send("Không tìm thấy sân bay."); // Trả về mã lỗi 404 nếu không tìm thấy sân bay
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving airport")
//         ); // Bắt lỗi và chuyển giao cho middleware xử lý lỗi
//     }
// }

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const airportService = new AirPortService(MongoBD.client);
        const document = await airportService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Ariport not found"));
        }
        return res.send({ message: "Airport was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating airport with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const airportService = new AirPortService(MongoBD.client);
        const document = await airportService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Airport not found"));
        }
        return res.send({ message: "Airport was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete airport with id=${req.params.id}`));
    }
};