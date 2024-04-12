const express = require("express");
const airlines = require("../controllers/airline.controller")

const router = express.Router();

router.route('/')
    .get(airlines.findAll)
    .post(airlines.create);

router.route('/:id')
    .post(airlines.update)
    .get(airlines.findOne)
    .delete(airlines.delete);

module.exports = router;