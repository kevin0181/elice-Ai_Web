const express = require("express")
const app = express();
const dayjs = require('dayjs');
const postsRouter = require("./routes/posts")
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log("Database Connection Success");
});

app.use(cors()); //cors 오류를 일시적으로 해결, 'npm install http cors' 입력

app.use(express.json()); // 이걸 해줘야지 json형태로 바디로 받아오기 때문에 필수!

app.use("/posts", postsRouter);

app.locals.formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

app.listen(8080, () => {
    console.log("server open");
})