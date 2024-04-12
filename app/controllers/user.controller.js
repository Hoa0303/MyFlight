const UserService = require("../services/user.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Create and Save a new User
exports.create = async (req, res, next) => {
    try {
        const userService = new UserService(MongoBD.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

exports.findByEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userService = new UserService(MongoBD.client);
        const user = await userService.findByEmailAndPassword(email, password);

        if (!user) {
            return next(new ApiError(401, "Incorrect email or password"));
        }
        // Return the user details if login successful
        return res.send(user);
    } catch (error) {
        console.error('Error logging in:', error);
        return next(new ApiError(500, "An error occurred while logging in"));
    }
};

// Retrieve all users of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoBD.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An errer occured while retrieving users")
        );
    }
    return res.send(documents);
};

// Find user with id
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoBD.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving user with id=${req.params.id}`));
    }
};

//Update a user
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }

    try {
        const userService = new UserService(MongoBD.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send({ message: "user was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};