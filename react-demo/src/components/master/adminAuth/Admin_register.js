import React, { useState } from "react"
// import "./register.css"
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
            axios.post("http://localhost:8000/admin_register", user)
                .then(res => {
                    alert(res.data.message)
                    history.push("/Admin_login")
                })
        } else {
            alert("invlid input")
        }   
    }

    return (
        <div className="container col-sm-6">
            {/* {console.log("User", user)} */}
            <h1>Admin Register Here...</h1>
            <label className="form-label">Name : </label>
            <input type="text" name="name" value={user.name} className="form-control" placeholder="Your Name" onChange={handleChange}></input>
            
            <label className="form-label">Email : </label>
            <input type="text" name="email" value={user.email} className="form-control" placeholder="Your Email" onChange={handleChange}></input>

            <label className="form-label">Password : </label>
            <input type="password" name="password" value={user.password} className="form-control" placeholder="Your Password" onChange={handleChange}></input>
            
            <label className="form-label">Confirm Password : </label>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} className="form-control" placeholder="Re-enter Password" onChange={handleChange}></input>
            
            <button className="btn btn-primary mt-4" onClick={register} >Register</button>
            <div>or</div>
            <button className="btn btn-primary" onClick={() => history.push("/Admin_login")}>Login</button>
        </div>
    )
}

export default Register