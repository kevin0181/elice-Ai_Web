const express = require("express")
const app = express();
const dayjs = require('dayjs');
const postsRouter = require("./routes/posts")

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log("Database Connection Success");
});


app.use("/posts", postsRouter);

app.locals.formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

app.listen(8080, () => {
    console.log("server open");
})