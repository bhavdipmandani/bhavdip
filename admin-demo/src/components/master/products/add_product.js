import React, {Component} from 'react';
import axios from 'axios';
import Header from "../Header";
import Menu from "../Menu";
import {Link} from "react-router-dom";
import Footer from "../Footer";
// import Product_list from './product_list';

export default class AddProduct extends Component {

    constructor(props) {
        super(props)

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCategories = this.onChangeProductCategories.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            categories: '',
            image: '',
            description: '',
            price: ''
        }
    }


    onChangeProductName(e) {

        this.setState({product_name: e.target.value})
    }

    onChangeProductCategories(e) {
        this.setState({categories: e.target.value})
    }

    onChangeProductImage(e, props) {
        this.setState({
            image: e.target.value,
            // image: `http://localhost:5000/${props.image}`
        })
        // setImage(`http://localhost:5000/${props.detail.image}`)
    }

    // onChangeProductImage = e => {
    //     this.setState({[e.target.image]: URL.createObjectURL(e.target.files[0])})
    //   }

    onChangeProductDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangeProductPrice(e) {
        this.setState({price: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const ProductObject = {
            product_name: this.state.product_name,
            categories: this.state.categories,
            image: this.state.image,
            description: this.state.description,
            price: this.state.price,
        };

        axios.post('http://localhost:8000/api/v1/product', ProductObject, {
            headers: {
                'authorization': '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        });

        this.setState({
            product_name: '',
            categories: '',
            image: '',
            description: '',
            price: ''
        })
    }

    render() {
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
                                        <Link to="/main" className="text-white" rel="manifest">
                                            back to Home
                                        </Link>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Add Product Here.....</h1>
                                </div>
                                {/* /.col */}
                                {/*<div className="col-sm-6">*/}
                                {/*    <ol className="breadcrumb float-sm-right">*/}
                                {/*        <li className="breadcrumb-item">*/}
                                {/*            <a href="#">Home</a>*/}
                                {/*        </li>*/}
                                {/*        <li className="breadcrumb-item active">Add_Product</li>*/}
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
                                <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                                    <div className="mb-3">
                                        <label className="form-label">Product_Name <strong>:</strong> </label>
                                        <input type="text" value={this.state.product_name}
                                               onChange={this.onChangeProductName} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categories <strong>:</strong> </label>
                                        <input type="text" value={this.state.categories}
                                               onChange={this.onChangeProductCategories} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image <strong>:</strong> </label>
                                        <input type="file" value={this.state.image} onChange={this.onChangeProductImage}
                                               className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description <strong>:</strong> </label>
                                        <input type="text" value={this.state.description}
                                               onChange={this.onChangeProductDescription} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price <strong>:</strong> </label>
                                        <input type="text" value={this.state.price} onChange={this.onChangeProductPrice}
                                               className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>

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
} 
