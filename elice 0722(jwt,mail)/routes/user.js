const { Router } = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler")
const cryto = require("crypto");
const { User } = require("../models");
const jwt = require("jsonwebtoken")
const jwtConfig = require("./../config/jwtConfig")
const nodeMailer = require("nodemailer")

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
    if (checkEmail.status !== null || checkEmail.status !== undefined) {
        if (checkEmail.status === true) {
            console.log(`너 비밀번호 초기화했었으니깐, 
            비밀번호만 ㅈㅐ생성하는 페이지로 리다이렉트`);
        }
    }
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


router.post("/find/password", asyncHandler(async (req, res, nex) => {

    let { email } = req.body;
    let user = await User.findOne({ email });
    let myEmail = "dudspsdl123321@gmail.com";
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: myEmail,
            pass: "wsdjonteaayznmkm"
        }
    });

    const randomPassword = randomPw();
    const hashRandomPassword = passwordHash(randomPassword);

    console.log(hashRandomPassword);

    await User.findOneAndUpdate({ shortId: user.shortId }, {
        password: hashRandomPassword,
        status: true
    });

    console.log(hashRandomPassword);

    let info = await transporter.sendMail({
        from: `"Elice" <${myEmail}>`,
        to: user.email,
        subject: 'Reset Password By Elice',
        html: `<b>초기화 비밀번호 : ${randomPassword}</b>`
    });

    console.log(info.messageId);

    res.json({ result: "이메일을 전송하였습니다." });


}));

const randomPw = () => {
    return Math.floor(Math.random() * (10 ** 8)).toString().padStart('0', 8);
}

const passwordHash = (password) => {
    return cryto.createHash("sha1").update(password).digest("hex");
}





module.exports = router;