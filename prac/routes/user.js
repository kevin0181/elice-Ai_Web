const {Router} = require('express');
const router = Router();
const {User} = require('./../models/');
const asyncHandler = require('../utils/async-handler');
const crypto = require('crypto');


router.post("/login", (req, res, next) => {

});

router.post("/sign", asyncHandler(async (req, res, next) => {

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