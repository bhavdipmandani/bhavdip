import React, { Component } from "react";
import Products from "../products/products";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../products/Home";
// import { apiUrl } from '../../config';
// import { useHistory } from "react-router-dom"
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            login: false,
            token: null,
            store: null,
        }
    }

    componentDidMount() {
        let store = JSON.parse(localStorage.getItem('login'));
        this.setState({ store: store })
        if (store && store.login) {
            this.setState({ login: true })
        }
    }


    login() {
        // console.log('--------------------------------' , apiUrl)
        fetch(`http://localhost:8000/api/v1/auth/login`,{
            method: "POST",
            body: JSON.stringify(this.state)
        }).then((res) => {
            res.json().then((result) => {
                // console.warn(result.token)
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: result.token
                }));
                // console.log('-------------------' , res.data.data.user)

                this.setState({

                    login: true
                })
            })
        })
    }

    render() {
        return (

            <div>
                {!this.state.login ?

                    <div className="hold-transition login-page">
                        <div className="login-box">
                            <div className="login-logo">
                                <a href="#"><b>Login</b>Here...</a>
                            </div>
                            {/* <!-- /.login-logo --> */}
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">Sign in to start your session</p>

                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" onChange={(event) => { this.setState({ email: event.target.value }) }} placeholder="Email" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Password" onChange={(event) => { this.setState({ password: event.target.value }) }} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                <input type="checkbox"  className="me-2" id="remember" />
                                                <label for="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        {/* <!-- /.col --> */}
                                        <div className="col-4">
                                            <button type="submit" className="btn btn-primary btn-block" onClick={() => { this.login() }}>Sign In</button>
                                        </div>
                                        {/* <!-- /.col --> */}
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
                                    {/* <!-- /.social-auth-links --> */}

                                    <p className="mb-1">
                                        <a href="#">I forgot my password</a>
                                    </p>
                                    <p className="mb-0">
                                        <Link to="/register" type="submit" value="Create User" className="text-center" >Register a new membership</Link>
                                    </p>
                                </div>
                                {/* <!-- /.login-card-body --> */}
                            </div>
                        </div>


                    </div>

                    :
                    <Home />
                }
            </div>
        );
    }
}

export default Login;


//
// import React, {useState } from "react"
//
// import axios from "axios"
// import { useHistory} from "react-router-dom"
//
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
//         axios.post("http://localhost:8000/api/v1/auth/login", user)
//             .then(res => {
//                 // alert(res.data.message)
//                 setLoginUser(res.data.data.user)
//                 history.push("/")
//             })
//     }
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
