const { ObjectId } = require("mongodb");

class AirLineService {
    constructor(client) {
        this.Airline = client.db().collection("hanghangkhong");
    }

    extractAirLineData(payload) {
        const ariline = {
            code: payload.code,
            name: payload.name,
        };

        Object.keys(ariline).forEach(
            (key) => ariline[key] === undefined && delete ariline[key]
        );

        return ariline;
    }

    async create(payload) {
        const airline = this.extractAirLineData(payload);
        const result = await this.Airline.findOneAndUpdate(
            { code: airline.code },
            { $set: { ...airline } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.Airline.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Airline.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAirLineData(payload);
        const result = await this.Airline.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Airline.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = AirLineService;