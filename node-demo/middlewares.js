// const jwt = require('jsonwebtoken')
// const tokenSecret = "my-token-secret"
//
// exports.verify = (req, res, next) => {
//     const token = req.headers.authorization
//     if (!token) res.status(403).json({error: "please provide a token"})
//     else {
//         jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
//             if (err) res.status(500).json({error: 'failed to authenticate token'})
//             req.user = value.data
//             // req.user = value
//
//             next()
//         })
//     }
// }


const jwt = require('jsonwebtoken');
const {JWT} = require('../node-demo/config');
const {User} = require('../node-demo/models');


const Authenticate = async (req, res, next) => {
    try{
        const customError = new Error();
        customError.code = 401;
        const {authorization} = req.headers;
        if (!authorization) {
            customError.message = 'Unauthorized';
            throw customError
        }
        const split = authorization.split(' ');
        if (split.length <= 1) {
            customError.message = 'Bad format for authorization';
            throw customError
        }
        const verifyToken = jwt.verify(split[1], JWT.secret);

        const rootUser = await User.findOne({_id: verifyToken._id}).lean();

        if(!rootUser) {
            customError.message = 'User not Found';
            throw customError
        }
        rootUser.authToken = split[1];
        rootUser.isAdmin = rootUser.role === 'ADMIN';
        delete rootUser.password;
        delete rootUser.__v;
        req.user = rootUser;
        next();

    }
    catch (err) {
            return res.send(err);
    }

}


module.exports = Authenticate;
