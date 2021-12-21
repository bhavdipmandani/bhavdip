
import React from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { apiUrl } from '../../../config';
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

class Admin_Address_list extends React.Component {
    // state = {
    //     products: []
    // }

    constructor() {
        super();
        this.state = {
            address: [' '],
          //   isOpen: false
        };
    }
//     openModal = () => this.setState({ isOpen: true });
//     closeModal = () => this.setState({ isOpen: false });

    componentDidMount() {
        axios.get(`${apiUrl}/address`)
            .then(res => {
                const address = res.data.data.address;
                this.setState({ address });
            })
    }

    // updateRow(name, e) {
    //     axios.patch(`http://localhost:8000/product_list/${name}`)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);

    //             const products = this.state.products.filter(item => item.name !== name);
    //             this.setState({ products });
    //         })

    // }



    deleteRow(_id, e) {
        axios.delete(`localhost:8000/address_list/${_id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const address = this.state.address.filter(item => item._id !== _id);
                this.setState({ address });
            })

    }

    render() {
        return (
            <div>
                <Header />
                <Menu />


                <div className="content-wrapper">

                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary mt-1 mb-3">
                                        <Link to="/main" className="text-white" rel="manifest">
                                            back to Home
                                        </Link>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Retailer's Address Data</h1>
                                </div>
                                {/* /.col */}
                                {/*<div className="col-sm-6">*/}
                                {/*    <ol className="breadcrumb float-sm-right">*/}
                                {/*        <li className="breadcrumb-item">*/}
                                {/*            <a href="#">Home</a>*/}
                                {/*        </li>*/}
                                {/*        <li className="breadcrumb-item active">Address_list</li>*/}
                                {/*    </ol>*/}
                                {/*</div>*/}
                                {/* /.col */}
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



                <table className="table table-border table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.address ?
                                this.state.address.map((item) =>
                                    <tr>
                                        <td>{item.street}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{item.zip}</td>
                                        <td>{item.country}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={(e) => this.deleteRow(item._id, e)}>
                                                <i class="bi bi-trash-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg></i>
                                            </button>
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
    <Footer />
    </div>
        )
    }
}

export default Admin_Address_list;
