const {Schema, mongoose} = require('mongoose');
const shortId = require('./types/short-id');
module.exports = new Schema({
    shortId,
    title: String,      //제목
    content: String,    //내용
    author: String,
}, {
    timestamps: true,  //생성 시간 및 document 수정 시간 또한 알려준다.
});