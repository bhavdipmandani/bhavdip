import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {apiUrl} from '../../../config';
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import Helper from "../../../helper";
import '../../../assets/css/order.css'


const OrderList = () => {

    const [order, setOrder] = useState()
    console.log(order)
    let orderData = async () => {
        try {
            const response = await fetch(`${apiUrl}/order`, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem('Token')}`,
                })
            });
            let data = await response.json();
            return data
        } catch (e) {
            return console.log(e)
        }
    }

    useEffect(() => {
        orderData().then(((data) => setOrder(data.data.Order)));
    }, []);


    return (
        <div>
            <Header/>
            <Menu/>


            <div className="content-wrapper">

                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary mt-1 mb-3">
                                    <Link to="/main" className="text-white" rel="manifest"
                                          style={{textDecoration: 'none'}}>
                                        back to Home
                                    </Link>
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Retailer's Ordered Data</h1>
                            </div>
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">

                            <table className="table table-border mt-3">
                                <thead>
                                <tr align="center">
                                    <th>Order No.</th>
                                    <th>UserName</th>
                                    <th>UserPhoneNumber</th>
                                    <th>ProductName</th>
                                    <th>ProductImages</th>
                                    <th>ProductPrice</th>
                                    <th>Quantity</th>
                                    <th>TotalPrice</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    order ?
                                        order.map((item) =>
                                            <tr align="center">
                                                <td>1</td>
                                                <td><p className="mt-5">{item.userId.name}</p></td>
                                                <td><p className="mt-5">{item.userId.phone}</p></td>
                                                <td>{item.productData.map((result) => <tr><p
                                                    className="mt-3">{result.productId.product_name}</p></tr>)}</td>
                                                <td>{item.productData.map((result) => <tr><img
                                                    src={Helper.getImageUrl(result.productId.image)} className="mt-2"
                                                    height="60px" width="80px"/></tr>)}</td>
                                                <td>{item.productData.map((result) => <tr><p
                                                    className="mt-3">{'\u20B9'} {result.productId.price}</p></tr>)}</td>
                                                <td>{item.productData.map((result) => <tr><p
                                                    className="mt-3">{result.quantity}</p></tr>)}</td>
                                                <td><p className="mt-5">{'\u20B9'} {item.totalPrice}</p></td>
                                                <td>{item.addressId.street} ,
                                                    <br/>
                                                    {item.addressId.landmark} ,
                                                    <br/>
                                                    {item.addressId.city} ,
                                                    <br/>
                                                    {item.addressId.state} {item.addressId.zip} ,
                                                    <br/>
                                                    {item.addressId.country}</td>
                                                <td><button className="btn btn-success"><i className="bi bi-check-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-check-lg"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                    </svg></i></button>
                                                    <button className="btn btn-danger ms-4"><i className="bi bi-x">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-x"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg></i></button></td>
                                            </tr>
                                        )
                                        :
                                        null
                                }
                                </tbody>

                            </table>
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content */}
            </div>
            <Footer/>
        </div>
    )

}

export default OrderList;
