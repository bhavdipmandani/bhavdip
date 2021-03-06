const { User : Model } = require('../models')


const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

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

            userLogin = userLogin.toObject();
            userLogin.authToken = token;
            delete userLogin.password;

            if (!isMacthing) {
                customError.message ="Invalid credientials pass*" ;
                throw customError;

            } else {
                return res.data({User: userLogin});
                res.json({ message: "User Login successfully" });
            }

        } else {
            customError.message = "Invalid credientials pass*";
            throw customError;
        }

    } catch (err) {
        console.log(err);
        return res.error(err);
    }
}





exports.register = (req, res) => {
    const { name, email,phone, password } = req.body
    Model.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new Model({
                name,
                email,
                phone,
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
    return jwt.sign({ data: user }, tokenSecret)
    // return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
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
            message: 'data found'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            message: e.message
        });
    }

};


