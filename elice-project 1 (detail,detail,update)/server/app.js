const express = require("express")
const mongoose = require("mongoose")
const postsRouter = require("./routes/posts")
const userRouter = require("./routes/user")
const authMiddleware = require("./utils/authMiddleware")

const cors = require('cors')
const bodyParser = require("body-parser")


const app = express();


//DB 연결
mongoose.connect("mongodb://localhost:27017/myapp");

mongoose.connection.on("connected", () => {
    console.log('DB connect success');
})

mongoose.connection.on("error", (err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//posts url 경로 라우팅
app.use("/posts", authMiddleware, postsRouter);

//user url 경로 라우팅
app.use("/user", userRouter);


app.listen(8080, () => {
    console.log('server open');
})