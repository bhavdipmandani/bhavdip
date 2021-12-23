import React, {useEffect, useState} from "react";
import Retailer_footer from "../footer/Retailer_footer";
import StripeCheckout from 'react-stripe-checkout';
import {apiUrl} from "../../config";
import Helper from "../../helper";
import '../../assets/css/checkout.css'
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom"

const Checkout = (props) => {

    const history = useHistory()


    const [address, setAddress] = useState([])
    const [addressId, setAddressId] = useState(null)
    const [store, setStore] = useState([])
    const [user, setUser] = useState({});
    let Data = async () => {

        const response = await fetch(`${apiUrl}/address`);
        let addressData = await response.json();
        // console.log(addressData)
        return addressData;
    }

    let Store = async () => {

        const response = await fetch(`${apiUrl}/store`);
        let storeData = await response.json();
        // console.log('-------------------------',storeData )
        return storeData;
    }
    useEffect(() => {
        Data().then(((data) => setAddress(data.data.address)));
        Store().then(((data) => setStore(data.data.product_data)));

        setInterval(() => {
            const userString = localStorage.getItem('Token');
            setUser(userString)

        }, [])
    }, 5000);


    const getMenu = () => {
        return (

            user ? <>

            </> : <>
                <div className="alert alert-danger mt-4 container" role="alert">
                    <p className="alertmsg">
                        <i className="fa fa-exclamation me-2" aria-hidden="true"></i>
                        You are not logged in our site...<Link to="/login" className="me-4 alert-link"
                                                               style={{textDecoration: 'none'}}>Click here to
                        login</Link>
                    </p>
                </div>
            </>
        )
    }


    // const addOrder = async (e) => {
    //     // const addressId = address[address.length - 1]._id;
    //
    // }

    const totalPrice = props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty)).reduce((acc, next) => acc + next, 0);


    const publishableKey = 'pk_test_51K3wdKSCD8AaqSEyaOviwA6W2Tk4u3Icy80NIbiPyUvwEmsb12rPZMPILtygdP6jpXu0Nx9wM6IbK7FPxabB4dDm00ts89ornF';
    const priceForStripe = totalPrice * 100;
    const onToken = async (token) => {


        let userId = localStorage.getItem('Id');

        let myheader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
        let totalAmounts = () => {
            return props.props.storeProduct.map((item) => item.products.price * item.qty).reduce((amout, next) => amout + next, 0);
        }
        let totalPrice = totalAmounts();


        let productsData = props.props.storeProduct.map((item) => ({
            "productId": item.products._id,
            "quantity": item.qty,
        }))


        fetch(`${apiUrl}/order`, {
            method: "POST",
            headers: myheader,
            body: JSON.stringify({
                userId: userId,
                productData: productsData,
                totalPrice: totalPrice,
                addressId: addressId
            })
        }).then((res) => {
            props.props.removeAllToStore(props.props.storeProduct)
            history.push("/")
            return console.log(res)
        }
        )
            .catch((e) => console.log(e))


        console.log('order entered success')
        // console.log('-------------------res', res)


        console.log(token);
        // alert('Payment Succesful!');
    };


    const paymentButton = () => {
        return (
            user && addressId ? <>
                <div>
                    {/*<div onClick={() => addOrder()}>*/}
                    {/*    <Payment TotalAmount={props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))*/}
                    {/*        .reduce((acc, next) => acc + next, 0)}/></div>*/}
                    <div className="paymentbtn">
                        <StripeCheckout
                            label='Pay Now'
                            name='For Demo Payment'
                            // billingAddress
                            // shippingAddress
                            amount={priceForStripe}
                            panelLabel='Pay Now'
                            description={`Your total is ${totalPrice}`}
                            token={onToken}
                            stripeKey={publishableKey}

                        />
                    </div>
                </div>
            </> : <>
                <p className="loginmsg">Select Delivery Address....</p>
            </>
        )
    }


    const name = localStorage.getItem('Name')

    return (

        <div>
            <div>
                {getMenu()}
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
                                        <th>UserName</th>
                                        <th>Street</th>
                                        <th>LandMark</th>
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
                                                    {
                                                        item.userId.name == name ?
                                                            <>
                                                                <td><input type="radio" name="address" onClick={() => setAddressId(item)}/></td>
                                                                <td>{item.userId.name}</td>
                                                                <td>{item.street}</td>
                                                                <td>{item.landmark}</td>
                                                                <td>{item.city}</td>
                                                                <td>{item.state}</td>
                                                                <td>{item.zip}</td>
                                                                <td>{item.country}</td>
                                                            </>
                                                            :

                                                            null
                                                    }
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
                                                        <td className="cart-remove"
                                                            onClick={() => props.props.removeToStoreHandler(item.products._id)}
                                                        >
                                                            <button className="badge badge-danger">X</button>
                                                        </td>
                                                    </div>


                                                    <div>
                                                        <h6 className="my-0">Product_Name : </h6>
                                                        <small
                                                            className="text-muted">{item.products.product_name}</small>
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
                                                    <span
                                                        className="text-muted">{'\u20B9'} {parseInt(item.products.price) * parseInt(item.qty)}</span>
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
                                        <small
                                            className="totalprice text-dark">{props.props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))
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
                        {paymentButton()}
                    </div>

                </div>
            </div>


            <Retailer_footer/>


        </div>


    )
}

export default Checkout;
