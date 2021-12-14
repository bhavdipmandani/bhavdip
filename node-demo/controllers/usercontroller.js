const { User : Model } = require('../models')


const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

// exports.login = (req, res) => {
//     const { email, password } = req.body
//     Model.findOne({ email: email }, (err, user) => {
//         if (user) {
//             if (password === user.password) {
//
//                 res.status(200).json({
//                     success: true,
//                     code: 200,
//                     data: {
//                         user: user
//                     },
//                     token: generateToken(user),
//                     error: null,
//                     message: "Login Successfull",
//                 })
//             } else {
//                 res.send({ message: "Password didn't match" })
//             }
//         } else {
//             res.send({ message: "User not registered" })
//         }
//     })
// }

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customError = new Error();
        customError.code = 422;
        if (!email || !password) {
            customError.message = "All field required" ;
            throw customError;
        }

        let userLogin = await Model.findOne({ email: email });

        if (userLogin) {
            const compare = (password,inputPassword) => {
                return password === inputPassword;
            }
            const isMacthing = await compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);
            // res.cookie("jwtoken", token, {
            //     expires: new Date(Date.now() + 25892000000),
            //     httpOnly: true
            //

            userLogin = userLogin.toObject();
            userLogin.authToken = token;
            delete userLogin.password;

            if (!isMacthing) {
                customError.message ="Invalid credientials pass*" ;
                throw customError;

            } else {
                return res.send({User: userLogin});
                res.json({ message: "User Login successfully" });
            }

        } else {
            customError.message = "Invalid credientials pass*";
            throw customError;
        }

    } catch (err) {
        console.log(err);
        return res.send(err);
    }
}





exports.register = (req, res) => {
    const { name, email, password } = req.body
    Model.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new Model({
                name,
                email,
                password, 
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200).json({
                        success: true,
                        code: 200,
                        data: {
                            user: user,
                        },
                        token: generateToken(user),
                        error: null,
                        message: "Successfully Registered, Please login now.",
                    })
                }
            })
        }
    })

};

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}


exports.list = async (req, res) => {
    try {
        const userData = await Model.find();
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                users: userData
            },
            error: null,
            mesage: 'data found'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            mesage: e.mesage
        });
    }

};


