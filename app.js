const express = require("express");
const cors = require("cors");
const ticketsRouter = require("./app/routes/ticket.route");
const bookticket = require("./app/routes/bookticket.route");
const typeRouter = require("./app/routes/type.route");
const usersRouter = require("./app/routes/user.route");
const airlineRouter = require("./app/routes/airline.route");
const planeRouter = require("./app/routes/plane.route");
const airportRouter = require('./app/routes/airport.route');
const flightRouter = require("./app/routes/flight.route");
const flight_routeRouter = require("./app/routes/flight_route.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tickets", ticketsRouter);
app.use("/api/bookticket", bookticket);
app.use("/api/type", typeRouter);
app.use("/api/users", usersRouter);
app.use("/api/airline", airlineRouter);
app.use("/api/plane", planeRouter);
app.use("/api/airport", airportRouter);
app.use("/api/flight", flightRouter);
app.use("/api/flight_route", flight_routeRouter);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to my flight. " });
});

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


module.exports = app;