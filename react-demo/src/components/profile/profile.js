import React, {useEffect, useState} from 'react';
import {apiUrl} from '../../config';
import Helper from "../../helper";
import {Form, FormControl} from "react-bootstrap";


const Profile = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [order, setOrder] = useState()
    const [address, setAddress] = useState([])

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

    let Data = async () => {

        const response = await fetch(`${apiUrl}/address`);
        let addressData = await response.json();
        // console.log(addressData)
        return addressData;
    }

    useEffect(() => {
        orderData().then(((data) => setOrder(data.data.Order)));
        Data().then(((data) => setAddress(data.data.address)));
    }, []);

    const name = localStorage.getItem('Name')
    return (
        <div>

            <div className="d-flex justify-content-end">
                <Form className="mt-3">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                                 onChange={event => setSearchTerm(event.target.value)}/>
                </Form>
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="content">
                <div className="container">
                    <div className="row">

                        <h1 align="center" className="mt-4 mb-4">Retailer's Personal Information</h1>

                        <table className="table table-border mt-3">
                            <thead>
                            <tr align="center">
                                <th>UserName</th>
                                <th>UserPhoneNumber</th>
                                <th>Address</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                address ?
                                    address.filter((val) => {
                                        if (searchTerm === "") {
                                            return val;
                                        } else if (val.userId.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return val
                                        }
                                    }).map((item) =>
                                        <tr align="center">
                                            {
                                                item.userId.name == name ?
                                                    <>
                                                        <td>{item.userId.name}</td>
                                                        <td>{item.userId.phone}</td>
                                                        <td>{item.street} , {item.landmark} , {item.city} {item.zip} ,
                                                            {item.state} ,
                                                            {item.country}
                                                        </td>
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


                        <h1 align="center" className="mt-4 mb-4">Retailer's Order Information</h1>

                        <table className="table table-border mt-3">
                            <thead>
                            <tr align="center">
                                <th>ProductName</th>
                                <th>ProductImages</th>
                                <th>ProductPrice</th>
                                <th>Quantity</th>
                                <th>TotalPrice</th>
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
                                            {
                                                item.userId.name == name ?
                                                    <>
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
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            {/* /.content */}

        </div>
    )

}

export default Profile;
