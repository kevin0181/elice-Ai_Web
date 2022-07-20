const mongoose = require("mongoose");
const PostSchema = require("./schemas/post")

exports.Post = mongoose.model("Post", PostSchema);