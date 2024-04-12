const TicketService = require("../services/ticket.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const ticketService = new TicketService(MongoBD.client);
        const document = await ticketService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the ticket')
        )
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const ticketService = new TicketService(MongoBD.client);
        documents = await ticketService.findAll({});
    } catch (errer) {
        return next(
            new ApiError(500, "An errer occured while retrieving plane")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const ticketService = new TicketService(MongoBD.client);
        const document = await ticketService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Ticket not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving ticket with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const ticketService = new TicketService(MongoBD.client);
        const document = await ticketService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Ticket not found"));
        }
        return res.send({ message: "Ticket was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating ticket with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const ticketService = new TicketService(MongoBD.client);
        const document = await ticketService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Ticket not found"));
        }
        return res.send({ message: "Ticket was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete ticket with id=${req.params.id}`));
    }
};