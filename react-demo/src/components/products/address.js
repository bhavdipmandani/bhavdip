import React, { Component } from 'react';
import axios from 'axios';
// import Product_list from './product_list';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CheckOut from "./checkout";


export default class Address extends Component {

    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onChangeContry = this.onChangeContry.bind(this);




        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            

            // for Error

            nameErr: "",
            emailErr: "",
            phoneErr: "",
            streetErr: "",
            cityErr: "",
            stateErr: "",
            zipErr: "",
            countryErr: "",
            error: "",

           
        }
        
    }


    componentDidUpdate(prevProps) {
        if(this.props.getTotalSum !== prevProps.getTotalSum){ //<---- see here
           this.setState({ CheckOut: this.props.getTotalSum});//<---- see here
        }
     }


     validate = () => {
        const {name , email , password , reEnterPassword} = this.state;
    
        !name ? this.setState(error => ({...error , nameErr : "Name is Required*" })) : this.setState (error => ({...error , nameErr : null }))
    
        // !email ? this.setState(error => ({...error , emailErr : "Email is Required*" })) : setError (error => ({...error , emailErr : null }))
    
        // !password ? this.setState(error => ({...error , passwordErr : "password is Required*" })) : setError (error => ({...error , passwordErr : null }))
    
        // !reEnterPassword ? this.setState(error => ({...error , reEnterPasswordErr : "Confirm Password is Required*" })) : setError (error => ({...error , reEnterPasswordErr : null }))
    }


    onChangeName(e) {

        this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePhone(e) {
        this.setState({ phone: e.target.value })
    }


    onChangeStreet(e) {
        this.setState({ street: e.target.value })
    }

    onChangeCity(e) {
        this.setState({ city: e.target.value })
    }

    onChangeState(e) {
        this.setState({ state: e.target.value })
    }

    onChangeZip(e) {
        this.setState({ zip: e.target.value })
    }

    onChangeContry(e) {
        this.setState({ country: e.target.value })
    }

    

    onSubmit = async (e) => {
        e.preventDefault()

        const address = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            country: this.state.country,

        };

        await axios.post('http://localhost:8000/add_address', address);

        this.setState({
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        })

        this.validate();
    }

    render() {
        const totalPrice = `82000`;
        return (
            <div className="hold-transition register-page">
                <div className="register-box">
                    <div class="register-logo">
                        <h2> Add your Address </h2>
                    </div>
                    <div class="card">
                    <div class="card-body register-card-body"> 
                    <p class="login-box-msg">Add Your Address...</p>
                    <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                        <div className="input-group mb-3">
                            {/* <label className="form-label">Name <strong>:</strong> </label> */}
                            <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" placeholder="Enter Your Name" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        {this.state.error.nameErr && <span className="error">{this.state.error.nameErr}</span>}
                        <div className="input-group mb-3">
                            {/* <label className="form-label">Email <strong>:</strong> </label> */}
                            <input type="email" value={this.state.email} onChange={this.onChangeEmail} className="form-control" placeholder="Enter Your Email" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            {/* <label className="form-label">Phone <strong>:</strong> </label> */}
                            <input type="number" value={this.state.phone} onChange={this.onChangePhone} className="form-control" placeholder="Enter Your Phone Number"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-phone"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            {/* <label className="form-label">Street <strong>:</strong> </label> */}
                            <input type="text" value={this.state.street} onChange={this.onChangeStreet} className="form-control" placeholder="Enter Your Street"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-map-marker"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            {/* <label className="form-label">City <strong>:</strong> </label> */}
                            <input type="text" value={this.state.city} onChange={this.onChangeCity} className="form-control" placeholder="Enter Your City Name"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-map-marker"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            {/* <label className="form-label">State <strong>:</strong> </label> */}
                            <input type="text" value={this.state.state} onChange={this.onChangeState} className="form-control" placeholder="Enter Your State Name"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-map-marker"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            {/* <label className="form-label">Zip <strong>:</strong> </label> fa fa-map-pin*/}
                            <input type="number" value={this.state.zip} onChange={this.onChangeZip} className="form-control" placeholder="Enter Your Pin Code"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-map-pin"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            {/* <label className="form-label">Country <strong>:</strong> </label> */}
                            <input type="text" value={this.state.country} onChange={this.onChangeContry} className="form-control" placeholder="Enter Your Country Name" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fa fa-map-marker"></span>
                                </div>
                            </div>
                        </div>
                        {!this.onSubmit ? (
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Add Address</button>
                            </div>
                        ) : ( 
                            //  <Link to="/checkout" type="submit" value="Create User" className="btn btn-primary">Checkout</Link>

                            <CheckOut price={totalPrice} product_name={"ddd"} >
                                <button type="submit" className="btn btn-primary mt-4"></button>
                            </CheckOut>
                       )}
                        {/* <div className="mb-3">
                        <button type="submit" className="btn btn-primary">CheckOut</button>
                    </div> */}
                    </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}