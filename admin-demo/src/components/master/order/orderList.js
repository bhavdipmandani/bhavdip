import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {apiUrl} from '../../../config';
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import Helper from "../../../helper";
import '../../../assets/css/order.css'
import {Form, FormControl} from "react-bootstrap";


const OrderList = () => {
    const [searchTerm, setSearchTerm] = useState('')
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
                            {/*<div className="d-flex justify-content-end">*/}
                            {/*    <button className="btn btn-primary mt-1 mb-3">*/}
                            {/*        <Link to="/main" className="text-white" rel="manifest"*/}
                            {/*              style={{textDecoration: 'none'}}>*/}
                            {/*            back to Home*/}
                            {/*        </Link>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Retailer's Ordered Data</h1>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Form className="mt-3">
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => setSearchTerm(event.target.value)} />
                                </Form>
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
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    order ?
                                        order.filter((val) => {
                                            if (searchTerm === "") {
                                                return val;
                                            } else if (val.userId.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        }).map((item) =>
                                            <tr align="center">
                                                <td className="count mt-5"></td>
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
                                                    {item.addressId.city} {item.addressId.zip} ,
                                                    <br/>
                                                    {item.addressId.state},
                                                    <br/>
                                                    {item.addressId.country}</td>
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
