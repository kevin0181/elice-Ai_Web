const { Router } = require('express')
const { Post } = require("./../models/");

const router = Router();


//게시글 작성 : 2번
//게시글이 작성되면 post형식의
// '/posts/' 에 해당하는 url이 라우팅되어 접근
router.post("/", async (req, res, next) => {
    const { title, content } = req.body;
    //formData에서 req.body를 통해 들어온 title, content를 가져옴
    try {
        //Post에 해당하는 스키마에 create 함수를 실행하고,
        //title과 content를 넣음.
        await Post.create({
            title,
            content
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
    const posts = await Post.find({});
    //가져온 데이터를 posts변수에 담아 json 형태로 응답합니다.
    res.json(posts);
});

module.exports = router;