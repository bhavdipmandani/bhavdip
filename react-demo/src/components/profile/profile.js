import React, {useEffect, useState} from 'react';
import {apiUrl} from '../../config';
import Helper from "../../helper";
import '../../assets/css/profile.css';

const Profile = () => {
    const [order, setOrder] = useState()

    let orderData = async () => {

        const userId = localStorage.getItem('Id')
        try {
            const response = await fetch(`${apiUrl}/order/${userId}`, {
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
        orderData().then(((data) => setOrder(data.data)));
    }, []);

    const retailerName = localStorage.getItem('Name')
    const retailerEmail = localStorage.getItem('Email')
    const retailerPhone = localStorage.getItem('Phone')

    return (
        <div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="content">
                <div className="container">
                    <div className="row">

                        <h1 align="center" className="mt-4 mb-4">Retailer's Personal Information</h1>

                        <table className="table table-border mt-3">
                            <thead>
                            <tr align="center">
                               <th>Retailer's Name</th>
                               <th>Retailer's Email</th>
                               <th>Retailer's PhoneNumber</th>
                            </tr>
                            </thead>

                            <tbody>
                                        <tr align="center">
                                            <td>{retailerName}</td>
                                            <td>{retailerEmail}</td>
                                            <td>{retailerPhone}</td>
                                        </tr>
                            </tbody>

                        </table>


                        <h1 align="center" className="mt-4 mb-4">Retailer's Order</h1>

                        <table className="table table-border mt-3">
                            <thead>
                            <tr align="center">
                                <th>No.</th>
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
                                    order.map((item) =>
                                        <tr align="center">
                                            <td className="count mt-5"></td>
                                                        <td>{item.productData.map((result) => <tr><p
                                                            className="mt-3">{result.productId.product_name}</p>
                                                        </tr>)}</td>
                                                        <td>{item.productData.map((result) => <tr><img
                                                            src={Helper.getImageUrl(result.productId.image)}
                                                            className="mt-2"
                                                            height="60px" width="80px"/></tr>)}</td>
                                                        <td>{item.productData.map((result) => <tr><p
                                                            className="mt-3">{'\u20B9'} {result.productId.price}</p>
                                                        </tr>)}</td>
                                                        <td>{item.productData.map((result) => <tr><p
                                                            className="mt-3">{result.quantity}</p></tr>)}</td>
                                                        <td><p className="mt-5">{'\u20B9'} {item.totalPrice}</p></td>
                                                        <td>{item.addressId.street} , {item.addressId.landmark} ,
                                                            <br/>
                                                            {item.addressId.city} {item.addressId.zip} ,
                                                            <br/>
                                                            {item.addressId.state} ,
                                                            <br/>
                                                            {item.addressId.country}
                                                        </td>
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
    )

}

export default Profile;
