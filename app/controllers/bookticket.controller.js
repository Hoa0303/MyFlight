const BookService = require("../services/bookticket.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const bookticket = new BookService(MongoBD.client);
        const document = await bookticket.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the BookTicket")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const bookticket = new BookService(MongoBD.client);
        documents = await bookticket.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An errer occured while retrieving BookTicket")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res) => {
    const userId = req.params.id;
    try {
        const bookticket = new BookService(MongoBD.client);
        const List = await bookticket.findById(userId);
        return res.send(List);
    } catch (error) {
        console.error("Error finding:", error);
        return res.status(500).send({ error: "An error occurred while finding" });
    }
};

exports.update = async (req, res, next) => {
    try {
        const bookticket = new BookService(MongoBD.client);
        const document = await bookticket.update(req.params.id);
        if (!document) {
            return next(new ApiError(404, "BookTicket not found"));
        }
        return res.send({ message: "BookTicket was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating BookTicket with id=${req.params.id}`)
        );
    }
};

exports.cancel = async (req, res, next) => {
    try {
        const bookticket = new BookService(MongoBD.client);
        const document = await bookticket.cancel(req.params.id);
        if (!document) {
            return next(new ApiError(404, "BookTicket not found"));
        }
        return res.send({ message: "BookTicket was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating BookTicket with id=${req.params.id}`)
        );
    }
};

exports.req = async (req, res, next) => {
    try {
        const bookticket = new BookService(MongoBD.client);
        const document = await bookticket.req(req.params.id);
        if (!document) {
            return next(new ApiError(404, "BookTicket not found"));
        }
        return res.send({ message: "BookTicket was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating BookTicket with id=${req.params.id}`)
        );
    }
};