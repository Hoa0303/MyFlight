const { ObjectId } = require("mongodb");

class AirPortService {
    constructor(client) {
        this.AirPort = client.db().collection("sanbay");
    }

    extractAirPortData(payload) {
        const airport = {
            code: payload.code,
            name: payload.name,
            local: payload.local,
        };

        Object.keys(airport).forEach(
            (key) => airport[key] === undefined && delete airport[key]
        );

        return airport;
    }

    async create(payload) {
        const airport = this.extractAirPortData(payload);
        const result = await this.AirPort.findOneAndUpdate(
            { code: airport.code },
            { $set: { ...airport } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.AirPort.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.AirPort.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // async findAirPortNameByLocal(payload) {
    //     const { local } = payload;
    //     const airport = await this.AirPort.findOne({
    //         local: local
    //     }, { projection: { _id: 0, name: 1 } });

    //     if (airport) {
    //         return airport.name;
    //     } else {
    //         return null;
    //     }
    // }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAirPortData(payload);
        const result = await this.AirPort.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.AirPort.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = AirPortService;