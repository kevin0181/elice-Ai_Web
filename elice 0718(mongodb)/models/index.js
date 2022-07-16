const mongoose = require('mongoose')
const PostSchema = require('./schemas/board')

exports.Post = mongoose.model('Post', PostSchema);
//모델 이름을 지정하여 Populate등에서 해당 이름으로 모델을 호출할 수 있음