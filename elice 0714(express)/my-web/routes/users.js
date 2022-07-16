var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  next();
});

router.get("/name", (req, res) => {
  res.send("my name kkk");
})

module.exports = router;
