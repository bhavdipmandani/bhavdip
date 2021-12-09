const User = require('../models/user')


const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

const login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
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
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
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
        const userData = await User.find();
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

// const grantAccess = function(action, resource) {
//     return async (req, res, next) => {
//      try {
//       const permission = roles.can(req.user.role)[action](resource);
//       if (!permission.granted) {
//        return res.status(401).json({
//         error: "You don't have enough permission to perform this action"
//        });
//       }
//       next()
//      } catch (error) {
//       next(error)
//      }
//     }
//    }

//    const allowIfLoggedin = async (req, res, next) => {
//     try {
//      const user = res.locals.loggedInUser;
//      if (!user)
//       return res.status(401).json({
//        error: "You need to be logged in to access this route"
//       });
//       req.user = user;
//       next();
//      } catch (error) {
//       next(error);
//      }
//    }


module.exports = {
    login,
    register,
    listdata,
    // grantAccess,
    // allowIfLoggedin
}
