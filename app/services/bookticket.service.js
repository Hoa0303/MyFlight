const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Bookticket = client.db().collection("datve");
    }

    extractBookData(payload) {
        const bookticket = {
            UserId: payload.UserId,
            status: payload.status,
            date: payload.date,
            req: payload.req,
            Tickets: payload.Tickets
        };

        Object.keys(bookticket).forEach(
            (key) => bookticket[key] === undefined && delete bookticket[key]
        );

        return bookticket;
    }

    async create(payload) {
        const bookticket = this.extractBookData(payload);
        bookticket.status = "Đang đợi duyệt";
        bookticket.req = 0;
        const result = await this.Bookticket.insertOne(bookticket);
        return result.insertedId.toString();
    }

    async find(filter) {
        const cursor = await this.Bookticket.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Bookticket.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            $set: {
                status: "Đã duyệt"
            }
        };
        const result = await this.Bookticket.findOneAndUpdate(
            filter,
            update,
            { returnDocument: "after" }
        );
        return result;
    }

    async req(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            $set: {
                status: "Yêu cầu hủy vé",
                req: 1
            }
        };
        const result = await this.Bookticket.findOneAndUpdate(
            filter,
            update,
            { returnDocument: "after" }
        );
        return result;
    }

    async cancel(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            $set: {
                status: "Đã hủy",
                req: 0
            }
        };
        const result = await this.Bookticket.findOneAndUpdate(
            filter,
            update,
            { returnDocument: "after" }
        );
        return result;
    }


    async delete(id) {
        const result = await this.Publish.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = BookService;