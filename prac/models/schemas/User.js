const {Schema, mongoose} = require('mongoose');
const shortId = require('./types/short-id');
module.exports = new Schema({
    shortId,
    email: String,      //이메일
    password: String,    //패스워드
    name: String,       //이름
}, {
    timestamps: true,  //생성 시간 및 document 수정 시간 또한 알려준다.
});