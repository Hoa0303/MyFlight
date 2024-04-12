const express = require("express");
const tickets = require("../controllers/ticket.controller")

const router = express.Router();

router.route('/')
    .get(tickets.findAll)
    .post(tickets.create);

router.route('/:id')
    .get(tickets.findOne)
    .put(tickets.update)
    .delete(tickets.delete);

module.exports = router;