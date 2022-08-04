const { Router } = require('express');
const router = Router();

router.get("/download", (req, res, next) => {
    const file = "./lemon.json";
    res.download(file);
});


module.exports = router;