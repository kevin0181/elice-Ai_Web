const { Router } = require('express')
const { Post } = require("./../models/");

const router = Router();

router.post("/", async (req, res, next) => {
    const { title, content } = req.body;
    try {

        await Post.create({
            title,
            content
        });

        res.json({
            result: '저장이 완료되었습니다.'
        })

    } catch (e) {
        next(e);
    }
})


router.get("/", async (req, res, next) => {
    const posts = await Post.find({});
    res.json(posts);
});

module.exports = router;