const express = require("express");
const flight = require("../controllers/flight.controller")

const router = express.Router();

router.route('/')
    .get(flight.findAll)
    .post(flight.create);

// router.route('/find')
//     .post(flight.findFlight);

router.route('/:id')
    .post(flight.update)
    .get(flight.findOne)
    .delete(flight.delete);

module.exports = router;