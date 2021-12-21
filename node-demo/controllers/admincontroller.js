const { User : Model } = require("../models")


exports.insertData = async (req, res) => {
    const { name, phone, email,  password, conpassword } = req.body;
    console.log("000000",req.body)
    try {
        const customError = new Error();
        customError.code = 422;
        if (!name || !phone || !email || !password || !conpassword) {
            customError.message = "plz filled all field.";
            throw customError;
        }
        const userExist = await Model.findOne({ email: email })

        if (userExist) {
            customError.message = "Email already Exist";
            throw customError;
        }
        if (password != conpassword) {
            customError.message = "password are not macthing";
            throw customError;
        }
        const user = new Model(req.body);
        await user.save();

        return res.data({user});

    } catch (e) {
        // res.send(e)
        return res.error(e);
    }

}
//
// exports.checkData = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const customError = new Error();
//         customError.code = 422;
//         if (!email || !password) {
//             customError.message = "All field required" ;
//             throw customError;
//         }
//
//         let userLogin = await Model.findOne({ email: email });
//         if (userLogin) {
//             const compare = (password,inputPassword) => {
//                 return password === inputPassword;
//             }
//             const isMacthing = await compare(password, userLogin.password);
//
//             const token = await userLogin.generateAuthToken();
//             console.log(token);
//
//             userLogin = userLogin.toObject();
//             userLogin.authToken = token;
//             delete userLogin.password;
//
//             if (!isMacthing) {
//                 customError.message ="Invalid credientials pass*" ;
//                 throw customError;
//             } else {
//                 return res.data({User: userLogin}, 'User Login successfully');
//             }
//         } else {
//             customError.message = "Invalid credientials pass*";
//             throw customError;
//         }
//
//     } catch (err) {
//         console.log(err);
//         return res.error(err);
//     }
// }

// exports.updateData = async (req, res) => {
//     try {
//         const _id = req.params.id;
//         console.log(req.body)
//         const single = await Model.findByIdAndUpdate(_id, req.body, {
//             new: true
//         });
//         if (!single) {
//             return res.message('Can not update', 409);
//         }
//         return res.data({user: single});
//     } catch (e) {
//         return res.error(e)
//     }
//
// }

exports.checkAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customError = new Error();
        customError.code = 422;
        if (!email || !password) {
            customError.message = "All field required" ;
            throw customError;
        }

        let userLogin = await Model.findOne({ email: email });

        if(userLogin){

            if(userLogin.role === 'ADMIN'){
                const compare = (password,inputPassword) => {
                    return password === inputPassword;
                }
                const isMacthing = await compare(password, userLogin.password);
                const token = await userLogin.generateAuthToken();
                console.log(token)

                userLogin = userLogin.toObject();
                userLogin.authToken = token;
                delete userLogin.password;

                if (!isMacthing) {
                    customError.message ="Invalid credientials pass*" ;
                    throw customError;

                } else {
                    return res.data({User: userLogin}, 'Admin Login successfully');
                }

            }else {
                customError.message = "Invalid credientials pass*";
                throw customError;
            }
        }else {
            customError.message = "Invalid credientials pass*";
            throw customError;
        }

    } catch (err) {
        console.log(err);
        return res.error(err);
    }
}

