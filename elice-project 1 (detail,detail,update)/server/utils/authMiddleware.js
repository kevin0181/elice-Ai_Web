const jwt = require("jsonwebtoken")
const jwtConfig = require("./../config/jwtConfig")

module.exports = async (req, res, next) => {
    //token값을 header에서 가져옴.
    const accessToken = req.header("accessToken");

    //토큰 값이 비워져 있는지 체크합니다.
    if (accessToken === null || accessToken === undefined) {
        //만약 비워져 있다면 오류를 발생시킵니다.
        res.status(403).json({ status: false, message: "권한 오류" });
    } else { //비워져있지 않다면?
        try {
            // 비동기 처리로 jwt의 인증을 합니다.
            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, jwtConfig.secret, (err, decode) => { //header를 통해 가져온 token이 서버에 존재하는지 인증을 하는 부분입니다.
                    if (err) {
                        reject(err); //인증 과정 중 오류가 나면 reject
                    } else {
                        resolve(decode); //인증 성공시 resolve
                    }
                });
            });


            //request의 tokenInfo부분에 토큰의 인증에 사용된 값을 저장합니다.
            req.tokenInfo = tokenInfo;
            //미들웨어로써 동작하기 때문에 next()를 작성해 주셔야 다음 미들웨어가 동작합니다.
            next();

        } catch (e) {
            res.status(403).json({ status: false, message: "권한 오류" });
        }
    }

}
