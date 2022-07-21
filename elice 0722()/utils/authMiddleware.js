const jwt = require('jsonwebtoken');
const jwtConfig = require('./../config/jwtConfig')

module.exports = async (req, res, next) => {
    const accessToken = req.header('accessToken'); //토큰 값 가져오기.
    if (accessToken === null || accessToken === undefined) { //토큰값이 비어있다면?
        res.status(403).json({ success: false, errormessage: 'Authentication fail' }); //오류 -> 로그인 하라고 하기
    } else {
        try {
            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, jwtConfig.secret, //jwt.verify => 인증 처리할대 사용.
                    (err, decoded) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded);
                        }
                    });
            });
            req.tokenInfo = tokenInfo;
            next();
        } catch (err) {
            console.log(err);
            res.status(403).json({ success: false, errormessage: 'Authentication fail' }); //토큰 처리중 오류나면 다시 로그인 하라고 처리.
        }
    }
}