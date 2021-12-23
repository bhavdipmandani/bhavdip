import React, {useState } from "react"

import axios from "axios"
import { useHistory} from "react-router-dom"
import {apiUrl} from "../../../config";

const Admin_login = ({ setLoginUser}) => {

    const history = useHistory()


    const [ user , setUser] = useState({
        email:"",
        password:"",
    })



    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post(`${apiUrl}adminauth/admin_login`, user)
        .then(res => {
            setLoginUser(res.data.data.user)
            history.push("/Main")
        })
    }

    return (
        <div className="hold-transition login-page">
                        <div className="login-box">
                            <div className="login-logo">
                                <a href="#">Admin<b>Login</b>Hear...</a>
                            </div>
                            {/* <!-- /.login-logo --> */}
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">Sign in to start your session</p>

                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" name="email" value={user.email}  placeholder="Email" onChange={handleChange} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange}  />
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
                                            <button type="submit" className="btn btn-primary btn-block"  onClick={login}>Sign In</button>
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
                                </div>
                                {/* <!-- /.login-card-body --> */}
                            </div>
                        </div>


                    </div>
    )
}

export default Admin_login
