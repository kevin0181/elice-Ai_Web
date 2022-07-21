const { Schema } = require("mongoose");
const shortId = require('./type/short-id');

module.exports = new Schema({
    shortId,
    title: String,
    content: String,
}, {
    timestamps: true
}
);