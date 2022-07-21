const { Router } = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler")
const cryto = require("crypto");
const { User } = require("../models");
const jwt = require("jsonwebtoken")
const jwtConfig = require("./../config/jwtConfig")

router.post("/signUp", asyncHandler(async (req, res, next) => {
    const { email, password, name } = req.body;

    let hashPassword = passwordHash(password);

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        // throw new Error("이미 가입된 이메일입니다.");
        res.status(500);
        res.json({
            error: "이미 가입된 이메일입니다."
        })
        return;
    }

    await User.create({
        email,
        password: hashPassword,
        name
    });

    res.json({
        result: "회원가입이 완료되었습니다. 로그인을 해주세요."
    })

}));


router.post("/login", asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    let hashPassword = passwordHash(password);

    const checkEmail = await User.findOne({ email });

    if (!checkEmail) {
        res.status(401);
        res.json({
            fail: "존재하지 않는 이메일입니다."
        })
        return;
    }

    if (hashPassword !== checkEmail.password) {
        res.status(401);
        res.json({
            fail: "비밀번호가 틀렸습니다."
        })
        return;
    }

    jwt.sign({
        email: email,
        name: checkEmail.name
    }, jwtConfig.secret, {
        expiresIn: '1d' //1y,1d,2h,1m,5s
    }, (err, token) => {
        if (err) {
            res.status(401).json({ status: false, message: "로그인을 해주세요." });
        } else {
            res.json({
                status: true,
                accessToken: token,
                email: email,
                name: checkEmail.name
            });
        }
    })



}))











const passwordHash = (password) => {
    return cryto.createHash("sha1").update(password).digest("hex");
}





module.exports = router;