const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { User } = require("./../models")
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");

router.get("/kakao/callback/node", async (req, res, next) => {

    const REST_API_KEY = "1cf2f1fcd0eb3df4344ed058e6f7da3e";
    const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
    const KAKAO_PARAMS = req.query.clientId;

    await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_PARAMS}`, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then(getToken => {
        if (getToken.status === 200) {
            //성공적으로 토큰을 받아왔으면 콘솔로 찍어봄.
            // console.log(res.data.access_token);

            getKakaoUserData(getToken.data.access_token)
                .then(userInfo => {
                    checkEmailBySocail(userInfo, res);
                });
        }
    });

});

const checkEmailBySocail = async (userInfo, res) => {

    const checkEmail = await User.findOne({ email: userInfo.data.kakao_account.email });

    if (checkEmail) { //이미 가입되어있다면?? 로그인 처리해준다.
        jwt.sign({
            email: checkEmail.email,
            name: checkEmail.name
        }, jwtConfig.secret, {
            expiresIn: '1d' //1y,1d,2h,1m,5s
        }, (err, token) => {
            if (err) {
                res.status(401).json({ status: false, message: "로그인을 해주세요." });
            } else {
                res.json({
                    loginStatus: true,
                    accessToken: token,
                    email: email,
                    name: checkEmail.name,
                });
            }
        });
        return;
    } else {
        userInfo.data.loginStatus = false;
        res.json(userInfo.data);
    }
}

const getKakaoUserData = async (token) => {
    return await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': `application/x-www-form-urlencoded;charset=utf-8`
        }
    })
}



module.exports = router;
