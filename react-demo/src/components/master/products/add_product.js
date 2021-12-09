import React, { Component } from 'react';
import axios from 'axios';
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
            image: null,
            description: '',
            price: ''
        }
    }
    

    onChangeProductName(e) {

        this.setState({ product_name: e.target.value })
    }

    onChangeProductCategories(e) {
        this.setState({ categories: e.target.value })
    }

    onChangeProductImage(e , props){
        this.setState({ 
            image: e.target.value,
            image: `http://localhost:5000/${props.image}`
         })
        // setImage(`http://localhost:5000/${props.detail.image}`)
    }

    // onChangeProductImage = e => {
    //     this.setState({[e.target.image]: URL.createObjectURL(e.target.files[0])})
    //   }

    onChangeProductDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeProductPrice(e) {
        this.setState({ price: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const ProductObject = {
            product_name: this.state.product_name,
            categories: this.state.categories,
            iamge: this.state.image,
            description: this.state.description,
            price: this.state.price,
        };

        axios.post('http://localhost:8000/add_product', ProductObject)
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
            <div className="container">
                <form onSubmit={this.onSubmit} enctype = "multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Product_Name <strong>:</strong> </label>
                        <input type="text" value={this.state.product_name} onChange={this.onChangeProductName} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categories <strong>:</strong> </label>
                        <input type="text" value={this.state.categories} onChange={this.onChangeProductCategories} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image <strong>:</strong> </label>
                        <input type="file" value={this.state.image} onChange={this.onChangeProductImage} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description <strong>:</strong> </label>
                        <input type="text" value={this.state.description} onChange={this.onChangeProductDescription} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price <strong>:</strong> </label>
                        <input type="text" value={this.state.price} onChange={this.onChangeProductPrice} className="form-control" />
                    </div>
                    <div className="mb-3"> 
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
} 