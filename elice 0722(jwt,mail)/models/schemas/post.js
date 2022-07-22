const { Schema } = require("mongoose");
const shortId = require('./type/short-id');

module.exports = new Schema({
    shortId,
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}
);