const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { User } = require("./../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");

router.get("/kakao", async (req, res, next) => {

    const REST_API_KEY = "cf28dbb409df1bda73557662b941eda0";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_CODE = req.query.code;
    // console.log(KAKAO_CODE);

    try {

        //4번
        await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(getToken => {
            //5번 -> 토큰가져온거.
            // console.log(getToken.data.access_token);
            getKakaoUserData(getToken.data.access_token).then(userData => {

                //가져온 유저정보가져와서 콘솔.
                console.log(userData.data);

                //user check 함수
                checkUserData(userData.data, res);

            });
        });

    } catch (e) {
        next(e);
    }

});


const checkUserData = async (userData, res) => {
    const checkEmail = await User.findOne({ email: userData.kakao_account.email });

    try {

        if (checkEmail) {    //checkEmail이 존재한다면? 가입이되어있다면?
            //로그인 진행

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
                        login: true,
                        status: true,
                        accessToken: token,
                        email: checkEmail.email,
                        name: checkEmail.name
                    });
                }
            })


        } else {
            //회원가입 페이지로 보내줌
            userData.login = false;
            res.json(userData)
        }

    } catch (e) {
        console.log(e);
    }

}


//카카오 유저 정보 가져오는 부분
const getKakaoUserData = async (token) => {

    return await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })

}






module.exports = router;