const {Router} = require('express');
const router = Router();
const {User} = require('./../models/');
const asyncHandler = require('../utils/async-handler');


router.post("/login", (req, res, next) => {

});

router.post("/sign", asyncHandler(async (req, res, next) => {
    const {email, password, name} = req.body;
    const checkEmail = await User.findOne({email});

    if (checkEmail) { //이메일 값 가지고 왔는지 체크
        throw new Error('이미 가입된 이메일 입니다.');
        return;
    }

    const pwHash = crypto.getRandomValues(password);

    console.log(pwHash);

    await User.create({
        email,
        pwHash,
        name
    });

}));


module.exports = router;