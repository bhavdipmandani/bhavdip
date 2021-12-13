import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const [error , setError] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
        reEnterPasswordErr: "" 
    })

    const validate = () => {
    const {name , email , password , reEnterPassword} = user;

    !name ? setError(error => ({...error , nameErr : "Name is Required*" })) : setError (error => ({...error , nameErr : null }))

    !email ? setError(error => ({...error , emailErr : "Email is Required*" })) : setError (error => ({...error , emailErr : null }))

    !password ? setError(error => ({...error , passwordErr : "password is Required*" })) : setError (error => ({...error , passwordErr : null }))

    !reEnterPassword ? setError(error => ({...error , reEnterPasswordErr : "Confirm Password is Required*" })) : setError (error => ({...error , reEnterPasswordErr : null }))
}
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:8000/api/v1/auth/register", user)
                .then(res => {
                    // alert(res.data.message)
                    history.push("/login")
                })
        } else {
            // alert("invlid input")
        }
        validate();
    }

    return (
        // <div className="container col-sm-6">
        //     {/* {console.log("User", user)} */}
        //     <h1>Register Here...</h1>
        //     <label className="form-label">Name : </label>
        //     <input type="text" name="name" value={user.name} className="form-control" placeholder="Your Name" onChange={handleChange}></input>

        //     <label className="form-label">Email : </label>
        //     <input type="text" name="email" value={user.email} className="form-control" placeholder="Your Email" onChange={handleChange}></input>

        //     <label className="form-label">Password : </label>
        //     <input type="password" name="password" value={user.password} className="form-control" placeholder="Your Password" onChange={handleChange}></input>

        //     <label className="form-label">Confirm Password : </label>
        //     <input type="password" name="reEnterPassword" value={user.reEnterPassword} className="form-control" placeholder="Re-enter Password" onChange={handleChange}></input>

        //     <button className="btn btn-primary mt-4" onClick={register} >Register</button>
        //     <div>or</div>
        //     <button className="btn btn-primary" onClick={() => history.push("/login")}>Login</button>
        // </div>
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="register-logo">
                    <a href="#">Register<b>New</b>User</a>
                </div>

                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new membership</p>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        {error.nameErr && <span className="error">{error.nameErr}</span>}
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        {error.emailErr && <span className="error">{error.emailErr}</span>}
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        {error.passwordErr && <span className="error">{error.passwordErr}</span>}
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Confirm Your password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        {error.reEnterPasswordErr && <span className="error">{error.reEnterPasswordErr}</span>}
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                    <label for="agreeTerms">
                                        I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block" onClick={register}>Register</button>
                            </div>
                            {/* <!-- /.col --> */}
                        </div>

                        <div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2"></i>
                                Sign up using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2"></i>
                                Sign up using Google+
                            </a>
                        </div>

                        {/* <a href="login.html" className="text-center">I already have a membership</a> */}

                        <a href="#" className="text-center" onClick={() => history.push("/login")}>I already have a membership</a>
                    </div>
                    {/* <!-- /.form-box --> */}
                </div>
                {/* <!-- /.card --> */}
            </div>
        </div>
    )
}

export default Register
