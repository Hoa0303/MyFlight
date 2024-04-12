const express = require("express");
const flight_route = require("../controllers/flight_route.controller")

const router = express.Router();

router.route('/')
    .get(flight_route.findAll)
    .post(flight_route.create);

router.route('/find')
    .post(flight_route.findroute);

router.route('/:id')
    .post(flight_route.update)
    .get(flight_route.findOne)
    .delete(flight_route.delete);

module.exports = router;