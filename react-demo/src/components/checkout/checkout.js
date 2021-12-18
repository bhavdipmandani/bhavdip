import React, {Component, useEffect, useState} from "react";
import Retailer_footer from "../footer/Retailer_footer";
import axios from "axios";
import {apiUrl} from "../../config";
import Payment from "./payment";
import Helper from "../../helper";
import '../../assets/css/checkout.css'
import {Link} from "react-router-dom";

const Checkout = (props) => {

    const [address, setData] = useState([])
    const [store, setStore] = useState([])
    const [user,setUser] = useState({});

    let Data = async () => {

        const response = await fetch(`${apiUrl}/address`);
        let addressData = await response.json();
        return addressData;
    }

    let Store = async () => {

        const response = await fetch(`${apiUrl}/store`);
        let addressData = await response.json();
        return addressData;
    }
    useEffect( () => {
        Data().then(((data) => setData(data.data.address) ));
        Store().then(((data) => setStore(data.data.product_data) ));


        setInterval(() => {
            const userString = localStorage.getItem('Token');
            // const user = JSON.parse(userString);
            setUser(userString)
        },[])
    },5000);
    const getMenu =  () => {
        return (

            user ? <>

            </> : <>
                <div className="alert alert-danger mt-4 container" role="alert">
                    <p className="alertmsg">
                        <i className="fa fa-exclamation me-2" aria-hidden="true"></i>
                        You are not logged in our site...<Link to="/login" className="me-4 alert-link" style={{ textDecoration: 'none' }}>Click here to login</Link>
                    </p>
                </div>
            </>
        )
    }



    const paymentButton = () => {
        return (

            user ? <>
                <div>
                    <button onClick={productStoreUpdate} className="btnAdd"><Payment
                        TotalAmount={props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))
                            .reduce((acc, next) => acc + next, 0)}/></button>
                </div>
            </> : <>
                <strong className="loginmsg">Please login our website..... </strong>
            </>
        )
    }


    const productStoreUpdate = async (e) => {
        e.preventDefault()
        const productStore = this.props.props.storeProduct.map(items => items.products._id);
        console.log('-------------------productData', productStore)

        const userId = localStorage.getItem('Id');
        console.log('-------------------userId', userId)

        const storeData = store[0]._id;
        console.log(storeData)
        const res = await axios.patch(`${apiUrl}/store/${storeData}`, {
            productId: productStore,
            userId: userId

        });
        console.log('-------------------res', res)
    }


        return (
            <div>
            <div>
                { getMenu() }
            </div>
                <div className="container-fluid">
                <div className="row">
                    <h1 align="center">CheckOut</h1>
                    <div className="col-md-12">
                        <div className="card">
                            <h1 align="center" className="mt-3 mb-3">Retailer Address List</h1>
                            <div className="container">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Select Any One</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                    <th>Country</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    address ?
                                        address.map((item) =>
                                            <tr>
                                                <td align="center"><input type="radio" name="address"/></td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.street}</td>
                                                <td>{item.city}</td>
                                                <td>{item.state}</td>
                                                <td>{item.zip}</td>
                                                <td>{item.country}</td>
                                            </tr>
                                        )
                                        :
                                        null
                                }
                                </tbody>

                            </table>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-12">
                        <div className="card">
                            <h1 align="center" className="mt-3 mb-3">Product Info........</h1>


                            {
                                props.props.storeProduct.map((item) => {
                                    return (
                                        <div className="container">
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">

                                                    <div>
                                                        <h6 className="my-0">Product_Name : </h6>
                                                        <small className="text-muted">{item.products.product_name}</small>
                                                    </div>


                                                    <div>
                                                        <h6 className="my-0">Image : </h6>
                                                        <small className="text-muted"><img
                                                            src={Helper.getImageUrl(item.products.image)}
                                                            style={{width: '100px', height: '80px'}}/></small>
                                                    </div>
                                                    <div>
                                                        <h6 className="my-0">Categories : </h6>
                                                        <small className="text-muted">{item.products.categories}</small>
                                                    </div>
                                                    <div>
                                                        <h6 className="my-0">Description : </h6>
                                                        <small
                                                            className="text-muted">{`${item.products.description.substring(0, 30)}...`}</small>
                                                    </div>
                                                    <div>
                                                        <h6 className="my-0">Quantity : </h6>
                                                        <small className="text-muted">{item.qty}</small>
                                                    </div>
                                                    <span className="text-muted">{'\u20B9'}{parseInt(item.products.price) * parseInt(item.qty)}</span>
                                            </li>
                                        </ul>

                                        </div>
                                    )

                                })

                            }
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <strong className="my-0">TotalAmount : </strong>
                                <small className="totalprice text-dark">{props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))
                                    .reduce((acc, next) => acc + next, 0)}</small>
                            </div>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="mt-4 mb-4">
                        {/*<button onClick={productStoreUpdate} className="btnAdd"><Payment*/}
                        {/*    TotalAmount={props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))*/}
                        {/*        .reduce((acc, next) => acc + next, 0)}/></button>*/}
                        { paymentButton() }
                    </div>

                </div>
            </div>


                <Retailer_footer />


            </div>




        )
    }

export default Checkout;