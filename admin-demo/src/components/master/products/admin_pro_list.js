
import React from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Editproduct from './Edit_product';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
class Admin_pro_list extends React.Component {
    // state = {
    //     products: []
    // }

    constructor() {
        super();
        this.state = {
            products: [' '],
            isOpen: false
        };
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    componentDidMount() {
        axios.get(`http://localhost:8000/product_list`)
            .then(res => {
                const products = res.data.data.products;
                this.setState({ products });
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
        axios.delete(`http://localhost:8000/product_list/${_id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const products = this.state.products.filter(item => item._id !== _id);
                this.setState({ products });
            })

    }

    render() {
        return (
            <div className="container content">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-3">
                     <Link to="/main" className="text-white" rel="manifest">
                        back to Home
                    </Link>
                   </button>
                </div>
                <h1>Product Data From-Api</h1>
                <table className="table table-border table-striped mt-3">
                    <thead>
                        <tr>
                            <th>product_name</th>
                            <th>Categories</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Pirce</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.products ?
                                this.state.products.map((item) =>
                                    <tr>
                                        <td>{item.product_name}</td>
                                        <td>{item.categories}</td>
                                        <td><img src={item.image} height="50px" width="70px" /></td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <Button className="btn btn-success me-3" onClick={this.openModal} data-toggle="modal" data-target="#exampleModal">
                                                <i class="bi bi-pencil-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </svg></i>
                                            </Button>
                                            <Modal show={this.state.isOpen} onHide={this.closeModal} id="exampleModal">
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit Here....</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    {/* Edit Form */}

                                                    <Editproduct />

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.closeModal}>
                                                        Close
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
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
        )
    }
}

export default Admin_pro_list;