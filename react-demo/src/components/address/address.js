import React, {Component} from 'react';
import axios from 'axios';
// import Payment from "../checkout/payment";
import {apiUrl} from '../../config';
import '../../assets/css/address.css';
import {Link} from "react-router-dom";

export default class Address extends Component {

    constructor(props) {
        super(props)


        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeLandmark = this.onChangeLandmark.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        // this.onChangeUserId = this.onChangeUserId.bind(this);

        this.addressStore = this.addressStore.bind(this);

        this.state = {
            street: '',
            landmark: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            userId: localStorage.getItem('Id')
        }
    }


    onChangeStreet(e) {
        this.setState({street: e.target.value})
    }
    onChangeLandmark(e) {
        this.setState({landmark: e.target.value})
    }

    onChangeCity(e) {
        this.setState({city: e.target.value})
    }

    onChangeState(e) {
        this.setState({state: e.target.value})
    }

    onChangeZip(e) {
        this.setState({zip: e.target.value})
    }

    onChangeCountry(e) {
        this.setState({country: e.target.value})
    }

    // onChangeUserId(e) {
    //     this.setState({userId: e.target.userId})
    // }


    addressStore = async (e) => {
        e.preventDefault()



       const res = await axios.post(`${apiUrl}/address`, this.state)
console.log(res);
        this.setState({
            street: '',
            landmark: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            userId: ''
        })

        const id = res.data.data.Address._id;
        localStorage.setItem('addressId', id);
    }

    render() {
        return (
            <div>

                <div className="register-page">
                    <div className="register-box">
                        <div className="card">
                            <div className="card-body register-card-body">
                                <p className="register-box-msg">Add Your Address...</p>

                                <form onSubmit={this.addressStore}>

                                    {/*<div className="input-group mb-3">*/}
                                    {/*    <input type="hidden" value={this.state.userId} onChange={this.onChangeUserId}*/}
                                    {/*           className="form-control" placeholder="Enter Your Street" name="userId"/>*/}
                                    {/*    <div className="input-group-append">*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.street} onChange={this.onChangeStreet}
                                               className="form-control" placeholder="Enter Your Street"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-marker"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.landmark} onChange={this.onChangeLandmark}
                                               className="form-control" placeholder="Enter Your LandMark"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-marker"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.city} onChange={this.onChangeCity}
                                               className="form-control" placeholder="Enter Your City Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-marker"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.state} onChange={this.onChangeState}
                                               className="form-control" placeholder="Enter Your State Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-marker"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.zip} onChange={this.onChangeZip}
                                               className="form-control" placeholder="Enter Your Pin Code"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-pin"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.country} onChange={this.onChangeCountry}
                                               className="form-control" placeholder="Enter Your Country Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-map-marker"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/*{!this.addressStore ? (*/}
                                    {/*    <div className="mb-3">*/}
                                    {/*        <button type="submit" className="btn btn-primary">Add Address</button>*/}
                                    {/*    </div>*/}
                                    {/*) : (*/}
                                    {/*<button type="submit" className="btn btn-primary">Add Address</button>*/}
                                    <button type="submit" onClick={this.addressStore}
                                            className="btnAdd mt-2 mb-2"> Address
                                        {/*<button type="submit" onClick={this.addressUpdate}  className="btnAdd">Address</button>*/}
                                    </button>

                                </form>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit"><Link to='/checkout' className="text-white"
                                                                              style={{textDecoration: 'none'}}> Checkout </Link>
                                    </button>

                                    {/*<button className="btn btn-primary" type="submit" onClick={this.addressUpdate}>dddd*/}
                                    {/*</button>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
