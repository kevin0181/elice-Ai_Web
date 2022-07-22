const { Router } = require('express')
const { Post } = require("./../models/");
const asyncHandler = require("./../utils/async-handler") //try catch문을 사용하지 않고 오류처리 미들웨어를 사용할 수 있도록하는 함수입니다.
const { User } = require("./../models/")

const router = Router();


//게시글 작성 : 2번
//게시글이 작성되면 post형식의
// '/posts/' 에 해당하는 url이 라우팅되어 접근
router.post("/", async (req, res, next) => {
    const { title, content, email } = req.body;
    console.log(title, content, email);
    //formData에서 req.body를 통해 들어온 title, content를 가져옴
    try {

        const authData = await User.findOne({ email });

        //Post에 해당하는 스키마에 create 함수를 실행하고,
        //title과 content를 넣음.
        await Post.create({
            title,
            content,
            author: authData
        });

        //에러가 나지 않고 정상적으로 저장이 되면 
        //응답을 json 형태로 보내줍니다.
        res.json({
            result: '저장이 완료되었습니다.'
        })

    } catch (e) {
        //에러가 발생 할 경우, 오류 처리 미들웨어로 넘겨줍니다.
        next(e);
    }
})

//게시글 리스트 : 2번
//게시글 리스트를 가져오기 위해 '/posts/'를 get방식으로 라우팅 되어 접근하게 됩니다.
router.get("/", async (req, res, next) => {
    //Post스키마에 해당되는 document들을 find (전부 가져옴)
    const posts = await Post.find({}).populate("author");
    //가져온 데이터를 posts변수에 담아 json 형태로 응답합니다.
    res.json(posts);
});


//게시글 삭제 : 2번
router.get("/:shortId/delete", async (req, res, next) => {

    //shortId를 파라미터를 통해 가져옵니다.
    const { shortId } = req.params;

    try {
        //shortId에 해당하는 document를 삭제합니다.
        await Post.deleteOne({ shortId });

        //만약 오류가 나지 않고 삭제를 완료했다면, json형태를 응답해줍니다.
        res.json({
            result: '삭제가 완료 되었습니다.'
        })

    } catch (e) {
        next(e);
    }
});


//게시글 찾기 : 2번
router.get("/:shortId/find", async (req, res, next) => {

    //게시글의 shortId를 파라미터에서 가져옵니다.
    let { shortId } = req.params;

    try {

        //shortId의 맞는 데이터를 가져옵니다. (title과 content를 가져옵니다)
        let data = await Post.findOne({ shortId });

        //가져온 데이터를 json형태로 응답합니다.
        res.json(data);

    } catch (e) {
        next(e);
    }
});


//게시글 수정 : 3번
router.post("/:shortId/update", async (req, res, next) => {

    // 파라미터에서 게시글에 해당하는 shortId값을 가져옵니다.
    let { shortId } = req.params;
    // formData에 존재하는 데이터를 req.body를 통해 title, content를 가져옵니다.
    let { title, content } = req.body;

    try {

        // shortId가 같은 데이터를 title, content를 update시켜줍니다.
        await Post.updateOne({ shortId }, {
            title,
            content
        });


        //만약 업데이트가 완료가 되면 json형태의 데이터를 응답해줍니다.
        res.json({
            result: "수정이 완료되었습니다."
        })

    } catch (e) {
        next(e);
    }

});


module.exports = router;