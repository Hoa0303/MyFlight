const express = require("express");
const planes = require("../controllers/plane.controller")

const router = express.Router();

router.route('/')
    .get(planes.findAll)
    .post(planes.create);

router.route('/:id')
    .post(planes.update)
    .get(planes.findOne)
    .delete(planes.delete);

module.exports = router;