const { ObjectId } = require("mongodb");

class FlightRouteService {
    constructor(client) {
        this.FlightRoute = client.db().collection("tuyen");
    }

    extractFlightRouteData(payload) {
        const flightroute = {
            MaTuyen: payload.MaTuyen,
            MaTuyenBay: payload.MaTuyenBay,
            TuyenBayId: payload.TuyenBayId,
            GiaTuyenBay: payload.GiaTuyenBay,
            NgayKhoiHanh: payload.NgayKhoiHanh,
            GioKhoiHanh: payload.GioKhoiHanh,
            GioDen: payload.GioDen,
            MaHang: payload.MaHang,
            AirlineId: payload.AirlineId,
            SoHieu: payload.SoHieu,
            PlaneId: payload.PlaneId
        };

        Object.keys(flightroute).forEach(
            (key) => flightroute[key] === undefined && delete flightroute[key]
        );

        return flightroute;
    }

    async create(payload) {
        const flightroute = this.extractFlightRouteData(payload);
        const result = await this.FlightRoute.findOneAndUpdate(
            { MaTuyen: flightroute.MaTuyen },
            { $set: { ...flightroute } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.FlightRoute.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.FlightRoute.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractFlightRouteData(payload);
        const result = await this.FlightRoute.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.FlightRoute.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = FlightRouteService;