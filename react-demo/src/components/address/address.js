import React, {Component} from 'react';
import axios from 'axios';
import Payment from "../checkout/payment";
import {apiUrl} from '../../config';
import '../../assets/css/address.css';
import {Link} from "react-router-dom";

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
        this.onChangeCountry = this.onChangeCountry.bind(this);


        this.addressStore = this.addressStore.bind(this);

        this.state = {

            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            productDatas: ''
        }
    }

    onChangeName(e) {
        this.setState({name: e.target.value})
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangePhone(e) {
        this.setState({phone: e.target.value})
    }


    onChangeStreet(e) {
        this.setState({street: e.target.value})
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


    addressStore = async (e) => {
        // e.preventDefault()
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

        const add = await axios.post(`${apiUrl}/address`, address);

        this.setState({
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',

        })

        console.log('-----------------------------', add)
    }

    componentDidMount() {
        axios.get(`${apiUrl}/address`)
            .then(res => {
                const storeIds = res.data.data.address;
                this.setState({storeIds});
                console.log(storeIds)
            })
    }

    addressUpdate = async (e, _id) => {

        const userIds = localStorage.getItem('Id');
        console.log('-------------------userId', userIds)

        const addressId = this.state.storeIds.map(items => items._id);
        console.log('-----------------------storeData', addressId)

        const res = await axios.patch(`${apiUrl}/address/${addressId}`, {
            userIds: userIds
        });
        console.log('-------------------res', res)
    }


    productStore = async (e) => {
        e.preventDefault()

        this.addressStore();
        this.addressUpdate();

        await axios.post(`${apiUrl}/store`);
        console.log('---------------------------------success')
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
                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.name} onChange={this.onChangeName}
                                               className="form-control" placeholder="Enter Your Name"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"> </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" value={this.state.email} onChange={this.onChangeEmail}
                                               className="form-control" placeholder="Enter Your Email"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"> </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="text" value={this.state.phone} onChange={this.onChangePhone}
                                               className="form-control" placeholder="Enter Your Phone Number"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-phone"> </span>
                                            </div>
                                        </div>
                                    </div>

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
                                    <button type="submit" onClick={this.productStore}
                                            className="btnAdd mt-2 mb-2"> Address
                                        {/*<button type="submit" onClick={this.addressUpdate}  className="btnAdd">Address</button>*/}
                                    </button>

                                </form>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary"><Link to='/checkout' className="text-dark"
                                                                              style={{textDecoration: 'none'}}> Checkout </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
