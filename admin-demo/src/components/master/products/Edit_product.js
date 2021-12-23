import React, {useState} from "react";
import {useLocation, useHistory, Link} from "react-router-dom";
import {apiUrl} from "../../../config";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import Helper from "../../../helper";

const EditProduct = () => {
    const history = useHistory();
    const location = useLocation();

    const [inputs,setInputs] = useState({
        product_name:location.state.item.product_name,
        categories:location.state.item.categories,
        image:location.state.item.image,
        description:location.state.item.description,
        price:location.state.item.price
    });

    const [error,setError] = useState({
        product_nameErr:"",
        categoriesErr:"",
        imageErr:"",
        descriptionErr:"",
        priceErr:""
    });

    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setInputs({
            ...inputs,
            [name]: value
        })

    }
    // console.log(JSON.stringify(inputs))
    const handleImage = (e) => {
        setInputs({...inputs,image:e.target.files[0]})
    }


    const validate = () =>{
        const { product_name, categories, price, description , image} = inputs;
        !product_name ? setError(error => ({ ...error, product_nameErr: "product_name is Required*" })) : setError(error => ({ ...error, product_nameErr: null }));
        !categories ? setError(error => ({ ...error, categoriesErr: "categories is Required*" })) : setError(error => ({ ...error, categoriesErr: null }));
        !image ? setError(error => ({ ...error,imageErr: "image is Required*" })) : setError(error => ({ ...error, imageErr: null }));
        !price ? setError(error => ({ ...error, priceErr: "price is Required*" })) : setError(error => ({ ...error, priceErr: null }));
        !description ? setError(error => ({ ...error, descriptionErr: "description is Required*" })) : setError(error => ({ ...error, descriptionErr: null }));

        return !Object.values(error).find(x => x);
    }

    const updateProduct = async () => {
        let id = location.state.item._id;
        if(validate()){

            let formData = new FormData();

            formData.append("product_name",inputs.product_name);
            formData.append("categories",inputs.categories);
            formData.append("image", inputs.image, inputs.image.name);
            formData.append("description",inputs.description);
            formData.append("price",inputs.price);
            console.log("/*-/*/*/-/", formData);

            const res = await fetch(`${apiUrl}/product/${id}`, {
                method:'PATCH',
                headers: new Headers({
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                }),
                body: formData
            });

            const data = await res.json();

            if(data.error || !data){
                console.log(data.error);
            }else {
                console.log("success");

            }}else {
            return;
        }

    }

    return (
        <>

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
                                    <h1 className="m-0 text-dark">Edit Product Here.....</h1>
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
                                    <input
                                        type="text"
                                        name="product_name"
                                        placeholder="Product Name"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={inputs.product_name}
                                    />
                                    {error.product_nameErr && <span className="error">{error.product_nameErr}</span>}
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Categories <strong>:</strong> </label>
                                    <input
                                        type="text"
                                        name="categories"
                                        placeholder="Product Title"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={inputs.categories}
                                    />
                                    {error.categoriesErr && <span className="error">{error.categoriesErr}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image <strong>:</strong> </label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        onChange={handleImage}
                                        // multiple
                                    />

                                <img src={Helper.getImageUrl(inputs.image)} height="250px" width="350px" className='mt-3'/>
                                {error.imageErr && <span className="error">{error.imageErr}</span>}

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description <strong>:</strong> </label>
                                    <textarea
                                        name="description"
                                        placeholder="Product Description"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={inputs.description}
                                    />
                                    {error.descriptionErr && <span className="error">{error.descriptionErr}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price <strong>:</strong> </label>
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Product Price"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={inputs.price}
                                    />
                                    {error.priceErr && <span className="error">{error.priceErr}</span>}
                                </div>
                                <div className="mb-3">
                                <button type={'button'}
                                        className="btn btn-primary"
                                        onClick={() => updateProduct()}
                                >Update Product</button>
                                </div>

                                <div className="mb-3">
                                <button type={'button'}
                                        className="btn btn-primary"
                                        onClick={() => history.goBack()}
                                >Cancel</button>
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

        </>
    )
}

export default EditProduct;
