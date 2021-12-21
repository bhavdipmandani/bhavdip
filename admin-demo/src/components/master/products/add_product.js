import React, {useState} from 'react';
// import axios from 'axios';
import Header from "../Header";
import Menu from "../Menu";
import {Link} from "react-router-dom";
import Footer from "../Footer";
import {apiUrl} from '../../../config';


const AddProduct = () => {
    let formData = new FormData();

    const [inputs, setInputs] = useState({
        product_name: '',
        categories: '',
        image: '',
        description: '',
        price: ''
    })

    const [error, setError] = useState({
        product_nameErr: '',
        categoriesErr: '',
        imageErr: '',
        descriptionErr: '',
        priceErr: ''
    })

    console.log(localStorage.getItem('Token'))
    formData.append("product_name", inputs.product_name);
    formData.append("categories", inputs.categories);
    formData.append("image", inputs.image);
    formData.append("description", inputs.description);
    formData.append("price", inputs.price);
    console.log("/*-/*/*/-/", formData);
    formData.append("newProduct", inputs)

    const validate = () => {
        const {product_name, categories, image, description, price} = inputs;
        !product_name ? setError(error => ({
            ...error,
            product_nameErr: "product_name is Required*"
        })) : setError(error => ({...error, product_nameErr: null}));
        !categories ? setError(error => ({
            ...error,
            categoriesErr: "category is Required*"
        })) : setError(error => ({...error, categoriesErr: null}));
        !image ? setError(error => ({...error, imageErr: "image is Required*"})) : setError(error => ({
            ...error,
            imageErr: null
        }));
        !description ? setError(error => ({
            ...error,
            descriptionErr: "description is Required*"
        })) : setError(error => ({...error, descriptionErr: null}));
        !price ? setError(error => ({...error, priceErr: "price is Required*"})) : setError(error => ({
            ...error,
            priceErr: null
        }));

        return !Object.values(error).find(x => x);
    }


    const onChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setInputs({
            ...inputs,
            [name]: value
        })

        console.log("--------------------------", inputs)

    }
    // console.log(JSON.stringify(inputs))
    const handleImage = (e) => {
        setInputs({...inputs, image: e.target.files[0]})
        console.log(e.target.files[0])
    }

    const addProduct = async () => {
        if (validate()) {


            let formData = new FormData();

            console.log('-------------------inputs.image', inputs.image);
            formData.append("product_name", inputs.product_name);
            formData.append("categories", inputs.categories);
            formData.append("image", inputs.image, inputs.image.name);
            formData.append("description", inputs.description);
            formData.append("price", inputs.price);
            console.log("/*-/*/*/-/", formData);

            const res = await fetch(`${apiUrl}/product`, {
                method: 'POST',
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem('Token')}`,
                }),
                body: formData
            });

            const data = await res.json();

            if (data.error || !data) {
                console.log(data.error);
            } else {
                console.log("success");
            }
        } else {
            return;
        }
        window.location.reload(false);

    }


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
                                    <Link to="/main" className="text-white" rel="manifest"
                                          style={{textDecoration: 'none'}}>
                                        back to Home
                                    </Link>
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Add Product Here.....</h1>
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
                            <div className="mb-3">
                                <label className="form-label">Product_Name <strong>:</strong> </label>
                                <input type="text" name="product_name"
                                       onChange={onChange} className="form-control"/>
                                {error.product_nameErr && <span className="error text-danger">{error.product_nameErr}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categories <strong>:</strong> </label>
                                <input type="text" name="categories"
                                       onChange={onChange} className="form-control"/>
                                {error.categoriesErr && <span className="error text-danger">{error.categoriesErr}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image <strong>:</strong> </label>
                                <input type="file" onChange={handleImage} name="image"
                                       className="form-control"/>
                                {error.imageErr && <span className="error text-danger">{error.imageErr}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description <strong>:</strong> </label>
                                <input type="text" name="description"
                                       onChange={onChange} className="form-control"/>
                                {error.descriptionErr && <span className="error text-danger">{error.descriptionErr}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price <strong>:</strong> </label>
                                <input type="text" onChange={onChange} name="price"
                                       className="form-control"/>
                                {error.priceErr && <span className="error text-danger">{error.priceErr}</span>}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary" onClick={() => addProduct()}>
                                        App_Product
                                </button>
                            </div>

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

export default AddProduct;
