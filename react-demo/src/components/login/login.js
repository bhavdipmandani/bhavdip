// import React, {useState } from "react"
//
// import axios from "axios"
// import { useHistory} from "react-router-dom"
// import { apiUrl } from '../../config';
// const Login = ({ setLoginUser}) => {
//
//     const history = useHistory()
//
//
//     const [ user , setUser] = useState({
//         email:"",
//         password:"",
//     })
//
//
//
//     const handleChange = e => {
//         const { name, value } = e.target
//         setUser({
//             ...user,
//             [name]: value
//         })
//     }
//
//     const login = () => {
//         axios.post(`${apiUrl}/auth/login`, user)
//             .then(res => {
//                 // console.log(res.data.data.user.name)
//                 // alert(res.data.message)
//                 setLoginUser(res.data)
//                 history.push("/")
//             })
//
//     }
//
//
//     return (
//
//         <div className="hold-transition login-page">
//             <div className="login-box">
//                 <div className="login-logo">
//                     <a href="#"><b>Login</b>Hear...</a>
//                 </div>
//                 {/* <!-- /.login-logo --> */}
//                 <div className="card">
//                     <div className="card-body login-card-body">
//                         <p className="login-box-msg">Sign in to start your session</p>
//
//                         <div className="input-group mb-3">
//                             <input type="email" className="form-control" name="email" value={user.email}  placeholder="Email" onChange={handleChange} />
//                             <div className="input-group-append">
//                                 <div className="input-group-text">
//                                     <span className="fas fa-envelope"></span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="input-group mb-3">
//                             <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange}  />
//                             <div className="input-group-append">
//                                 <div className="input-group-text">
//                                     <span className="fas fa-lock"></span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-8">
//                                 <div className="icheck-primary">
//                                     <input type="checkbox"  className="me-2" id="remember" />
//                                     <label for="remember">
//                                         Remember Me
//                                     </label>
//                                 </div>
//                             </div>
//                             {/* <!-- /.col --> */}
//                             <div className="col-4">
//                                 <button type="submit" className="btn btn-primary btn-block"  onClick={login}>Sign In</button>
//                             </div>
//                             {/* <!-- /.col --> */}
//                         </div>
//
//                         <div className="social-auth-links text-center mb-3">
//                             <p>- OR -</p>
//                             <a href="#" className="btn btn-block btn-primary">
//                                 <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
//                             </a>
//                             <a href="#" className="btn btn-block btn-danger">
//                                 <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
//                             </a>
//                         </div>
//                         {/* <!-- /.social-auth-links --> */}
//
//                         <p className="mb-1">
//                             <a href="#">I forgot my password</a>
//                         </p>
//                          <p className="mb-0">
//                                     <button className="btn btn-primary" onClick={() => history.push("/register")}>Register</button>
//                                     </p>
//                     </div>
//                     {/* <!-- /.login-card-body --> */}
//                 </div>
//             </div>
//
//
//         </div>
//     )
// }
//
// export default Login


import React, {useState} from "react";
import {apiUrl} from '../../config';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom"
import {Modal} from "react-bootstrap";


export default function Login() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const history = useHistory()
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState({
        emailErr: "",
        passwordErr: "",
        // invalidErr:""
    })


    const validate = () => {

        !email ? setError(error => ({...error, emailErr: "Email ID is Required*"})) : setError(error => ({
            ...error,
            emailErr: null
        }));
        !password ? setError(error => ({
            ...error,
            passwordErr: "Password is Required*"
        })) : setError(error => ({...error, passwordErr: null}))


        return !Object.values(error).find(x => x)
    }

    const loginUSer = async (e) => {
        if (!validate()) {
            return
        }
        // e.preventDefault();

        const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();
        // data.error.message === "Invalid credientials pass*" ? setError(error => ({...error,invalidErr: `${data.error.message}`})) : setError(error => ({...error,invalidErr: null}))


        // console.log(Error)
        if (data.error || !data) {
            // window.alert(data.error);
            console.log(data.error)

            console.log("Invalid Login");
        } else {
            setSuccess(true);
            let token = data.data.User.authToken;
            let name = data.data.User.name;
            let id = data.data.User._id;
            // console.log(id)
            localStorage.setItem('Token', token);
            localStorage.setItem('Name', name);
            localStorage.setItem('Id', id);

            // history.push("/")
        }

        setShow(true)
    };

    return (
        <div>


            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Login...</b></a>
                    </div>
                    {/* <!-- /.login-logo --> */}
                    <div className="card">
                        <div className="image">
                        </div>

                        <form>
                            <div className="card-body login-card-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <div className="input-group mb-3">

                                    <input type="email" name="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           placeholder="Your Email" className="form-control"/>
                                    {error.emailErr && <span className="error">{error.emailErr}</span>}
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password" id="pswd" className="form-control"/>
                                    {error.passwordErr && <span className="error">{error.passwordErr}</span>}
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" className="me-2" id="remember"/>
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                            <button type='button' className="btn btn-primary"
                                                    onClick={loginUSer}>Login
                                            </button>
                                    </div>
                                </div>

                                <div className="social-auth-links text-center mb-3">
                                    <p>- OR -</p>
                                    <a href="#" className="btn btn-block btn-primary">
                                        <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                                    </a>
                                    <a href="#" className="btn btn-block btn-danger">
                                        <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                                    </a>
                                </div>
                                <p className="mb-1">
                                    <a href="#">I forgot my password</a>
                                </p>
                                <p className="mb-0">
                                    <button className="btn btn-primary"
                                            onClick={() => history.push("/register")}>Register
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Congretulation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login successfully</Modal.Body>
                <Modal.Footer>
                    <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        <button className="btn link-btn text-white">Go To Home</button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
