const express = require("express")
const app = express();
const dayjs = require('dayjs');
const postsRouter = require("./routes/posts")

app.use("/posts", postsRouter);

app.locals.formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

app.listen(8080, () => {
    console.log("server open");
})