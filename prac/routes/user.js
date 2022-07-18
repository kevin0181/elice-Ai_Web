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

    if (password !== userData.password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
        return;
    }

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