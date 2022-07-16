const {Router} = require('express');
const router = Router();
const {Post} = require('./../models/');
const asyncHandler = require('../utils/async-handler');

// router.get('/', (req, res, next) => { //client side render 형식은 페이지를 render 하는 부분이 필요가 없다.
//     if (req.query.write) {
//         res.render('posts/edit');
//         return;
//     }
// });

router.post('/', async (req, res, next) => { // 게시글 작성
    console.log(req.body);
    const {title, content, author} = req.body;
    try {
        await Post.create({     //게시글을 DB에 저장
            title, content, author
        });
        res.json({      //저장 성공 시, result를 응답함.
            result: 'save-success'
        });
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => { //전체 게시글 목록을 전달해줌
    const page =
        Number(req.query.page || 1);
    const perPage =
        Number(req.query.perPage || 10);

    const total = await Post.countDocuments({});
    const posts = await Post.find({})
        .sort({createdAt: -1})      //마지막으로 작성 된 게시글을 첫번째 인덱스로
        .skip(perPage * (page - 1))
        .limit(perPage);
    const totalPage =
        Math.ceil(total / perPage);
    console.log(totalPage);
    res.json(posts);
});

router.get('/:shortId', asyncHandler(async (req, res, next) => { //게시글을 id로 지정해서 가져오는 부분
    const {shortId} = req.params;
    const post = await Post.findOne({shortId}); // mongoDB에서 생성하는 id 말고 우리가 직접 생성한 shortId로 접근해야합니다.
    if (!post) {
        throw new Error('Post NotFound'); //asyncHandler에서 오류처리를 해주므로써 throw로 error를 던지기만 해도 된다.
        return;
    }
    res.json(post);
}));

router.post('/:shortId', async (req, res, next) => { //id에 맞는 게시글 수정
    const {shortId} = req.params;
    const {title, content, author} = req.body;
    const post = await Post.findOneAndUpdate({shortId}, {
        title, content
    });
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    res.json({
        result: 'update-success'
    })
});


router.get('/delete/:shortId', async (req, res, next) => { //id에 맞는 게시글 삭제
    const {shortId} = req.params;
    try {
        await Post.findOneAndDelete({shortId});
        res.json({
            result: "delete-success"
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;