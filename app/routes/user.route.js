const express = require("express");
const users = require("../controllers/user.controller")

const router = express.Router();

router.route('/')
    .get(users.findAll)
    .post(users.create);

router.route('/:id')
    .get(users.findOne)
    .put(users.update);

router.route('/login')
    .post(users.findByEmailAndPassword);

module.exports = router;