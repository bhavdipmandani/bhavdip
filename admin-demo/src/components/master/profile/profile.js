import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {apiUrl} from '../../../config';
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import Helper from "../../../helper";
import '../../../assets/css/order.css'
import {Form, FormControl, Badge} from "react-bootstrap";


const Profile = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [user, setUser] = useState()
    let orderData = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth`, {
                method: "GET",
            });
            let data = await response.json();
            return data
        } catch (e) {
            return console.log(e)
        }
    }

    useEffect(() => {
        orderData().then(((data) => setUser(data.data.users)));
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
                                <Form className="mt-3">
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                                                 onChange={event => setSearchTerm(event.target.value)}/>
                                </Form>
                            </div>
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Retailer's Personal Data</h1>
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
                                    <th>RetailerName</th>
                                    <th>RetailerEmail</th>
                                    <th>RetailerPhoneNumber</th>
                                    <th>RetailerRole</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    user ?
                                        user.filter((val) => {
                                            if (searchTerm === "") {
                                                return val;
                                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        }).map((item) =>
                                            <tr align="center">
                                                {
                                                    item.role == 'USER' ?
                                                        <>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.role}</td>
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
            <Footer/>
        </div>
    )

}

export default Profile;
