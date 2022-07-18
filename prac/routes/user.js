const {Router} = require('express');
const router = Router();
const {User} = require('./../models/');
const asyncHandler = require('../utils/async-handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); //npm i jsonwebtoken -> jwt 설치


router.post("/signIn", asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    const userData = await User.findOne({email});
    if (!userData) {
        throw new Error("회원을 찾을 수 없습니다.");
        return;
    }

    let hashPassword = await passwordHash(password);
    if (hashPassword !== userData.hashPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
        return;
    }

    const secret = "005c9780fe7c11eb89b4e39719de58a5"; //UUID 암호 문자열 사용

    jwt.sign({
            email: email,
            name: userData.name
        },
        secret,
        {
            expiresIn: '1d'  //유효 기간이다. "1y", 일 단위 : "1 days", "1d", 시간 단위 : "2.5 hrs", "2h", 분 단위 : "1m", 초 단위 : "5s"
        }, (err, token) => {
            if (err) {
                console.log(err);
                res.status(401).json({success: false, errormessage: 'token sign fail'});
            } else {
                res.json({success: true, accessToken: token});
            }
        }
    )

}));

router.post("/signUp", asyncHandler(async (req, res, next) => {

    const {email, password, name} = req.body;

    let hashPassword = await passwordHash(password);

    const checkEmail = await User.findOne({email});

    if (checkEmail) { //이메일 값 가지고 왔는지 체크
        throw new Error('이미 가입된 이메일 입니다.');
        return;
    }

    await User.create({
        email,
        hashPassword,
        name
    });

    res.json({
        result: "signIn-success"
    })

}));

const passwordHash = async (pw) => {
    return crypto.createHash("sha1").update(pw).digest("hex");
}


module.exports = router;