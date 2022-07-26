const {Router} = require('express');
const router = Router();
const {Post, User} = require('./../models/');
const asyncHandler = require('../utils/async-handler');
const authMiddleware = require("../utils/authMiddleware");
const mongoose = require("mongoose")

// router.get('/', (req, res, next) => { //client side render 형식은 페이지를 render 하는 부분이 필요가 없다.
//     if (req.query.write) {
//         res.render('posts/edit');
//         return;
//     }
// });

router.post('/', asyncHandler(async (req, res, next) => { // 게시글 작성
    const {title, content, shortId} = req.body;

    try {
        const author = await User.findOne({shortId: shortId}); //문제에서는 find라고 되어잇는데 findOne을 사용해야합니다. //배열로받아옴.

        if (!author) {
            throw new Error("No User");
        }
        await Post.create({     //게시글을 DB에 저장
            title, content, author
        });
        res.json({      //저장 성공 시, result를 응답함.
            result: 'save-success'
        });
    } catch (err) {
        throw new Error(err);
    }
}));

router.get("/:shortId/posts", asyncHandler(async (req, res, next) => { //user에따른 리스트 전달

    if (req.query.page < 1) {
        next("Please enter a number greater than 1"); //page가 0보다 작으면 오류
        return;
    }

    const page =
        Number(req.query.page || 1);

    if (page > req.query.perPage) {
        next("Please enter a number greater than by page"); //perPage가 더크면 오류
        return;
    }

    const perPage =
        Number(req.query.perPage || 10);
    const {shortId} = req.params;
    const user = await User.find({shortId});
    const total = await Post.countDocuments({author: user});
    const posts = await Post.find({author: user})
        .sort({createdAt: -1})      //마지막으로 작성 된 게시글을 첫번째 인덱스로
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('author');

    const totalPage =
        Math.ceil(total / perPage);

    res.json({posts, totalPage});
}))

router.get("/", authMiddleware, async (req, res, next) => { //전체 게시글 목록을 전달해줌
    if (req.query.page < 1) {
        next("Please enter a number greater than 1"); //page가 0보다 작으면 오류
        return;
    }

    const page =
        Number(req.query.page || 1);

    if (page > req.query.perPage) {
        next("Please enter a number greater than by page"); //perPage가 더크면 오류
        return;
    }

    const perPage =
        Number(req.query.perPage || 10);

    const total = await Post.countDocuments({});
    const posts = await Post.find({})
        .sort({createdAt: -1})      //마지막으로 작성 된 게시글을 첫번째 인덱스로
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('author');
    const totalPage =
        Math.ceil(total / perPage);

    res.json({posts, totalPage});
});

router.get('/:shortId', asyncHandler(async (req, res, next) => { //게시글을 id로 지정해서 가져오는 부분 ->사용안함.
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

    const {title, content} = req.body;

    const findPost = await Post.findOne({
        shortId
    }).populate('author');

    if (findPost.author.shortId !== req.body.shortId) {
        next(new Error("Not Authorized"));
        return;
    }

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
        const post = await Post.findOne({
            shortId
        }).populate('author');

        if (post.author.shortId !== req.query.shortId) {
            next(new Error("Not Authorized"));
            return;
        }

        await Post.findOneAndDelete({shortId});
        res.json({
            result: "delete-success"
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;