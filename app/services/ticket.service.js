const { ObjectId } = require("mongodb");

class TicketService {
    constructor(client) {
        this.Ticket = client.db().collection("ve");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractTicketData(payload) {
        const ticket = {
            MaVe: payload.MaVe,
            MaTuyen: payload.MaTuyen,
            IdTuyen: payload.IdTuyen,
            MaDatVe: payload.MaDatVe,
            IdDatVe: payload.IdDatVe,
            MaLoai: payload.MaLoai,
            Gia: payload.Gia,
            IdLoai: payload.IdLoai,
            ChoNgoi: payload.ChoNgoi,
        };

        // Remove undefined fields
        Object.keys(ticket).forEach(
            (key) => ticket[key] === undefined && delete ticket[key]
        );

        return ticket;
    }

    async create(payload) {
        const ticket = this.extractTicketData(payload);
        const result = await this.Ticket.findOneAndUpdate(
            { MaVe: ticket.MaVe },
            { $set: { ...ticket } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findAll(filter) {
        const cursor = await this.Ticket.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Ticket.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTicketData(payload);
        const result = await this.Ticket.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Ticket.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = TicketService;