const { Schema } = require('mongoose')

const PostSchema = new Schema({
    title: String,
    content: String,
}, {
    timestamps: true
});

module.export = PostSchema;