const mongoose = require('mongoose')
const {Post} = require('./models/')
const express = require("express")
const app = express();
const createPost = require('./service/create');

const URL = 'mongodb://localhost:27017/myapp' //해당 url에 접속
mongoose.connect(URL); //url에 mongoose 라이브러리를 활용해서 DB에 접속한다.
const dbConnectionStatus = mongoose.connection; //DB Connection 상태를 확인하기 위해 활용.

dbConnectionStatus.on('error', (err) => { //DB Connection에서 오류가 났을 경우
    console.log(err);
});

dbConnectionStatus.once('open', () => { //DB Connection에서 성공적으로 접속을 했을 경우
    console.log("Database Connection Success");
})

app.listen(8080, () => { // express 서버를 8080포트로 오픈한다. 서버를 먼저 오픈한 후, DB 연결 시도.
    console.log("server open");
    createPost.create();
})
