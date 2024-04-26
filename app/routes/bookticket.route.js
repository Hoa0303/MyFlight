const express = require("express");
const bookticket = require("../controllers/bookticket.controller");

const router = express.Router();

router.route('/')
    .get(bookticket.findAll)
    .post(bookticket.create);

router.route('/:id')
    .get(bookticket.findOne)
    .post(bookticket.update)
    .put(bookticket.cancel);

router.route('/req/:id')
    .put(bookticket.req);

module.exports = router;