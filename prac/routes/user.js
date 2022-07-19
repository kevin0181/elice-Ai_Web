const {Router} = require('express');
const router = Router();
const {User} = require('./../models/');
const asyncHandler = require('../utils/async-handler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); //npm i jsonwebtoken -> jwt 설치
const secret = require('./../config/jwt-config');
const shortId = require("../models/schemas/types/short-id");
const nodeMailer = require("nodemailer"); //이메일 전송을 사용하기 위해 라이브러리 설치


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

    jwt.sign({
            email: email,
            name: userData.name
        },
        secret.secret,
        {
            expiresIn: '1d'  //유효 기간이다. "1y", 일 단위 : "1 days", "1d", 시간 단위 : "2.5 hrs", "2h", 분 단위 : "1m", 초 단위 : "5s"
        }, (err, token) => {
            if (err) {
                res.status(401).json({success: false, errormessage: 'token sign fail'});
            } else {
                res.json({success: true, accessToken: token, shortId: userData.shortId});
            }
        }
    )

}));

// router.post("/logout", asyncHandler((req, res, next) => {
// }))

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

router.post("/:shortId/find", asyncHandler(async (req, res, next) => {
    let shortId = req.params.shortId;
    let [user] = await User.find({shortId});
    let myEmail = 'dudspsdl123321@gmail.com'

    //이메일 인증을 사용하려면 구글에서 2단계 인증 및 앱비밀번호 생성해야함.

    let transporter = nodeMailer.createTransport({ // 이메일 보낼 사용자 정의하기.
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: myEmail,
            pass: 'bbqruwbkxybsadoj',
        },
    });
    const randomPassword = generateRandomPassword(); //랜덤한 수를 가져오고
    const hashRandomPassword = passwordHash(randomPassword);
    await User.findOneAndUpdate({shortId}, {
        hashPassword: hashRandomPassword
    })

    let info = await transporter.sendMail({
        from: `"WDMA Team" <${myEmail}>`,
        to: user.email,
        subject: 'WDMA Auth Number',
        html: `<b>초기화 비밀번호 : ${randomPassword}</b>`,
    });

    console.log('Message sent: %s', info.messageId);

    res.send(info.messageId);
}))

const passwordHash = async (pw) => {
    return crypto.createHash("sha1").update(pw).digest("hex");
}

function generateRandomPassword() {
    return Math.floor(Math.random() * (10 ** 8)).toString().padStart('0', 8);
}

module.exports = router;