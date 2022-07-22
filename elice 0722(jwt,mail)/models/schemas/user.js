const { Schema } = require("mongoose")
const shortId = require("./type/short-id")

module.exports = new Schema({
    shortId,
    email: String,
    password: String,
    name: String,
    status: false
}, {
    timestamps: true
})