const express = require("express")
const mongoose = require("mongoose")
const postsRouter = require("./routes/posts")
const userRouter = require("./routes/user")

const cors = require('cors')
const bodyParser = require("body-parser")


const app = express();


//DB 연결
mongoose.connect("mongodb://localhost:27017/myapp");

mongoose.connection.on("connected", () => { //DB에 연결이 완료되는 순간 익명함수가 실행됩니다.
    console.log('DB connect success');
})

mongoose.connection.on("error", (err) => { //DB에 연결하는중에 오류가 난다면 익명함수가 실행됩니다.
    console.log(err);
});


app.use(cors()); //접근 하는 모든 url에 cors처리해줍니다. //https://bohyeon-n.github.io/deploy/web/cors.html 참고
app.use(express.json()); //접근하는 모든 url의 데이터를 json형태로 받아옵니다.
app.use(bodyParser.urlencoded({extended: true})); //접근하는 모든 url의 body에 있는 데이터를 인코딩합니다.

//posts url 경로 라우팅
app.use("/posts", postsRouter); //http://localhost:8080/posts/***** 로 접근하는 모든 url을 라우팅 합니다.

//user url 경로 라우팅
app.use("/user", userRouter);   //http://localhost:8080/user/***** 로 접근하는 모든 url을 라우팅 합니다.


app.listen(8080, () => { //express 서버를 8080포트로 오픈합니다.
    console.log('server open');
})