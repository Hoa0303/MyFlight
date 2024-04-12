const express = require("express");
const airports = require("../controllers/ariport.controller")

const router = express.Router();

router.route('/')
    .get(airports.findAll)
    .post(airports.create);

// router.route('/find')
//     .post(airports.findAirport);

router.route('/:id')
    .post(airports.update)
    .get(airports.findOne)
    .delete(airports.delete);

module.exports = router;