// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Main from "../master/Main";

// class Admin_login extends Component {
//     constructor() {
//         super();
//         this.state = {
//             email: null,
//             password: null,
//             admin_login: false,
//             token: null,
//             store: null,
//         }
//     }

//     componentDidMount() {
//         let store = JSON.parse(localStorage.getItem('admin_login'));
//         this.setState({ store: store })
//         if (store && store.admin_login) {
//             this.setState({ admin_login: true })
//         }
//     }


//     login() {
        
//         fetch("http://localhost:8000/admin_login", {
//             method: "POST",
//             body: JSON.stringify(this.state)
//         }).then((res) => {
//             res.json().then((result) => {
//                 // console.warn(result.token)
//                 localStorage.setItem('admin_login', JSON.stringify({
//                     admin_login: true,
//                     token: result.token
//                 }));
//                 this.setState({
//                     admin_login: true
//                 })
//             })
//         })
//     }

//     render() {
//         return (
//             <div>

//                 {!this.state.admin_login ?

//                     <div className="container col-sm-6">
//                         <h1>Admin Login Here....</h1>
//                         <label className="form-label">Email : </label>
//                         <input type="text" onChange={(event) => { this.setState({ email: event.target.value }) }} className="form-control" />
//                         <br />
//                         <label className="form-label">Password : </label>
//                         <input type="password" onChange={(event) => { this.setState({ password: event.target.value }) }} className="form-control" />
//                         <br />
//                         <button onClick={() => { this.login() }} className="btn btn-primary">Login</button>
//                         <div>or</div>
//                         <div className="mb-3">
//                         <Link to="/Admin_register" type="submit" value="Create User" className="btn btn-primary btn-block" >Register</Link>
//                     </div>
//                     </div>
//                     :
//                     <Main />
//                 }

//             </div>
//         );
//     }
// }

// export default Admin_login;






import React, {useState } from "react"

import axios from "axios"
import { useHistory} from "react-router-dom"

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
        axios.post("http://localhost:8000/admin_login", user)
        .then(res => {
            // alert(res.data.message)
            setLoginUser(res.data.data.user)
            history.push("/Main")
        })
    }

    return (
        // <div className="container col-sm-6">
        //     <h1>Admin Login Here...</h1>
            
        //     <label className="form-label">Email : </label>
        //     <input type="text" name="email" value={user.email} className="form-control" onChange={handleChange} placeholder="Enter your Email"></input>
            
        //     <label className="form-label">Password : </label>
        //     <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange}  placeholder="Enter your Password"></input>
            
        //     <button  className="btn btn-primary mt-4" onClick={login}>Login</button>
        //     {/* <div>or</div>
        //     <button  className="btn btn-primary" onClick={() => history.push("/Admin_register")}>Register</button> */}
  
        // </div>

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
                                    {/* <p className="mb-0">
                                    <button className="btn btn-primary" onClick={() => history.push("/Admin_register")}>Register</button>
                                    </p> */}
                                </div>
                                {/* <!-- /.login-card-body --> */}
                            </div>
                        </div>


                    </div>
    )
}

export default Admin_login