const jwt = require('jsonwebtoken');
const jwtConfig = require('./../config/jwt-config')

module.exports = async (req, res, next) => {
    const accessToken = req.header('accessToken');
    console.log(accessToken);
    if (accessToken === null || accessToken === undefined) {
        res.status(403).json({success: false, errormessage: 'Authentication fail'});
    } else {
        try {
            const tokenInfo = await new Promise((resolve, reject) => {
                console.log(jwtConfig.secret);
                jwt.verify(accessToken, jwtConfig.secret,
                    (err, decoded) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log(decoded);
                            resolve(decoded);
                        }
                    });
            });
            req.tokenInfo = tokenInfo;
            next();
        } catch (err) {
            console.log(err);
            res.status(403).json({success: false, errormessage: 'Authentication fail'});
        }
    }
}