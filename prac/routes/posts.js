const {Router} = require('express');
const router = Router();
const {Post} = require('./../models/');

// router.get('/', (req, res, next) => { //client side render 형식은 페이지를 render 하는 부분이 필요가 없다.
//     if (req.query.write) {
//         res.render('posts/edit');
//         return;
//     }
// });

router.post('/', async (req, res, next) => { // 게시글 작성
    const {title, content} = req.body;
    try {
        await Post.create({     //게시글을 DB에 저장
            title, content,
        });
        res.json({      //저장 성공 시, result를 응답함.
            result: 'save-success'
        });
    } catch (err) {
        next(err);
    }
});

router.get("/list", async (req, res, next) => { //전체 게시글 목록을 전달해줌
    const posts = await Post.find({});
    res.json(posts);
});

router.get('/:shortId', async (req, res, next) => { //게시글을 id로 지정해서 가져오는 부분
    const {shortId} = req.params;
    const post = await Post.findOne({shortId});
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    res.json(post);
});

router.post('/:shortId', async (req, res, next) => { //id에 맞는 게시글 수정
    const {shortId} = req.params;
    const {title, content} = req.body;
    const post = await Post.findOneAndUpdate({shortId}, {
        title, content,
    });
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    res.json({
        result: 'update-success'
    })
});


router.delete('/:shortId', async (req, res, next) => { //id에 맞는 게시글 삭제
    const {shortId} = req.params;
    try {
        await Post.delete({shortId});
        res.json({
            result: "delete-success"
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;