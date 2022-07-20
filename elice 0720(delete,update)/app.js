const express = require("express")
const mongoose = require("mongoose")
const postsRouter = require("./routes/posts")
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
app.use("/posts", postsRouter);


app.listen(8080, () => {
    console.log('server open');
})