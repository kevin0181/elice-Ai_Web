const {Router} = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler")
const cryto = require("crypto");
const {User} = require("../models");
const jwt = require("jsonwebtoken")
const jwtConfig = require("./../config/jwtConfig")


//회원가입 : 2번
router.post("/signUp", asyncHandler(async (req, res, next) => {

    const {email, password, name} = req.body;
    //가지고온 password를 hash값으로 변경해준다.
    let hashPassword = passwordHash(password);

    //입력받은 이메일이 존재하는지 확인하기 위해 DB를 접속하여 가져온다.
    const checkEmail = await User.findOne({email});

    //만약 이메일이 존재한다면?
    if (checkEmail) {
        // throw new Error("이미 가입된 이메일입니다.");
        // 가입된 이메일 이기 때문에 에러처리
        res.status(500);
        res.json({
            error: "이미 가입된 이메일입니다."
        })
        return;
    }

    //존재하지 않는 이메일이라면 사용자 정보를 생성한다.
    await User.create({
        email,
        password: hashPassword,
        name
    });

    //가입 완료 응답처리.
    res.json({
        result: "회원가입이 완료되었습니다. 로그인을 해주세요."
    })

}));

//로그인 : 2번
router.post("/login", asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    //DB에 hash값으로 저장을 하였으니 로그인시, 가져온 패스워드 또한 hash값으로 변경 후 비교한다.
    let hashPassword = passwordHash(password);

    //가입되어있는 이메일이 맞는지 확인하기 위해 DB에 데이터를 가져온다.
    const checkEmail = await User.findOne({email});

    //만약 데이터가 없으면?
    if (!checkEmail) {
        //데이터가 존재하지 않으면 가입되지 않았기 때문에 에러처리.
        res.status(401);
        res.json({
            fail: "존재하지 않는 이메일입니다."
        })
        return;
    }

    //로그인시 가져온 패스워드와 DB에서 가져온패스워드를 비교하여 비밀번호가 일치하는지 확인한다.
    if (hashPassword !== checkEmail.password) {
        //같지 않으면 에러처리.
        res.status(401);
        res.json({
            fail: "비밀번호가 틀렸습니다."
        })
        return;
    }

    //만약 정상적인 접근이라면 JWT를 사용하여 email과 name을 서명해준다.
    //인증하는 부분은 내일 아침에 할꺼에요!
    //서명하는 부분만 한겁니다.
    jwt.sign({
        email: email,
        name: checkEmail.name
    }, jwtConfig.secret, {
        expiresIn: '1d' //1y,1d,2h,1m,5s //유효 기간
    }, (err, token) => {
        if (err) { //만약 서명하는 부분에서 오류가 난다면 에러처리.
            res.status(401).json({status: false, message: "로그인을 해주세요."});
        } else {
            //정상적으로 서명이 진행됐다면 Json형태로 응답해줌.
            res.json({
                status: true,
                accessToken: token,
                email: email,
                name: checkEmail.name
            });
        }
    })


}))


//cryto라는 node.js의 기본 모듈을 사용하여 sha1이라는 hash로 가져온 password를 변경합니다.
const passwordHash = (password) => {
    return cryto.createHash("sha1").update(password).digest("hex");
}


module.exports = router;