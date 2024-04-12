const { ObjectId } = require("mongodb");

class FlightService {
    constructor(client) {
        this.Flight = client.db().collection("tuyenbay");
    }

    extractFlightData(payload) {
        const flight = {
            MaTuyen: payload.MaTuyen,
            GiaTuyen: payload.GiaTuyen,
            SanBayDi: payload.SanBayDi,
            derpartId: payload.derpartId,
            SanBayDen: payload.SanBayDen,
            destinaId: payload.destinaId,
        };

        Object.keys(flight).forEach(
            (key) => flight[key] === undefined && delete flight[key]
        );

        return flight;
    }

    async create(payload) {
        const flight = this.extractFlightData(payload);
        const result = await this.Flight.findOneAndUpdate(
            { MaTuyen: flight.MaTuyen },
            { $set: { ...flight } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.Flight.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Flight.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // async findFlightByAirports(SanBayDi, SanBayDen) {
    //     const flight = await this.Flight.findOne({
    //         SanBayDi: SanBayDi,
    //         SanBayDen: SanBayDen
    //     }, { projection: { _id: 0, MaTuyen: 1 } });

    //     if (flight) {
    //         return flight.MaTuyen;
    //     } else {
    //         return null; // Không tìm thấy mã tuyến
    //     }
    // }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractFlightData(payload);
        const result = await this.Flight.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Flight.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = FlightService;