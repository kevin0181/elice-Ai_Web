const express = require("express")
const app = express();

let list = {
    "name": "이름",
    "number": "번호",
    "local": "지역"
}

app.get("/get/list", (req, res) => {
    res.json(list);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(8080, () => {
    console.log("server start");
})