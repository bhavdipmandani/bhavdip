const Admin = require('../models/admin_auth')


const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

const login = (req, res) => {
    const { email, password } = req.body
    Admin.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {

                res.status(200).json({
                    success: true,
                    code: 200,
                    data: {
                        user: user,
                        role: user.role
                    },
                    token: generateToken(user),
                    error: null,
                    message: "Login Successfull",
                })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    }) 
}


    const register = (req, res) => {
    const { name, email, password } = req.body
    Admin.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new Admin({
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


const listdata = async (req, res) => {
    try {
        const userData = await Admin.find();
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

module.exports = {
    login,
    register,
    listdata,
}
