const {Schema, mongoose} = require('mongoose');
const shortId = require('./types/short-id');
module.exports = new Schema({
    shortId,
    title: String,
    content: String,
    author: String,
}, {
    timestamps: true,
});