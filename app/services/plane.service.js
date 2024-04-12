const { ObjectId } = require("mongodb");

class PlaneService {
    constructor(client) {
        this.Plane = client.db().collection("maybay");
    }

    extractPlaneData(payload) {
        const plane = {
            SoHieu: payload.SoHieu,
            MaHang: payload.MaHang,
            AirlineId: payload.AirlineId,
            SoGhe: payload.SoGhe,
        };

        Object.keys(plane).forEach(
            (key) => plane[key] === undefined && delete plane[key]
        );

        return plane;
    }

    async create(payload) {
        const plane = this.extractPlaneData(payload);
        const result = await this.Plane.findOneAndUpdate(
            { SoHieu: plane.SoHieu },
            { $set: { ...plane } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.Plane.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Plane.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractPlaneData(payload);
        const result = await this.Plane.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Plane.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = PlaneService;