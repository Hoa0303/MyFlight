const express = require("express");
const types = require("../controllers/type.controller")

const router = express.Router();

router.route('/')
    .get(types.findAll)
    .post(types.create);

router.route('/:id')
    .get(types.findOne)
    .put(types.update)
    .delete(types.delete);

module.exports = router;