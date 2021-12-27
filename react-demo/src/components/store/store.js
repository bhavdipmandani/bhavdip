import React from "react";
import {Link} from "react-router-dom";
import Helper from '../../helper';

const AddStore = (props) => {
    return (
        <div className="container mt-4">
            <h1 align="center" className="mb-4">Retailer's Store</h1>

            <table className="table">

                <thead>
                <tr>
                    <th>Delete Product</th>
                    <th>Product_Name</th>
                    <th>Categories</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>

                <tbody>
                {
                    props.storeProduct.length > 0 ?
                        props.storeProduct.map((item) => {
                            return (
                                <tr>
                                    <td className="cart-remove" onClick = {() => props.props.removeToStoreHandler(item.products._id)}
                                    ><button className="badge badge-danger">X</button></td>
                                    <td>{item.products.product_name}</td>
                                    <td>{item.products.categories}</td>
                                    <td><img src={Helper.getImageUrl(item.products.image)} style={{width: '100px', height: '80px'}}/></td>
                                    <td>
                                        {/*{item.products.description}*/}
                                        {`${item.products.description.substring(0, 30)}...`}
                                    </td>
                                    <td>
                                        <span className="btn btn-primary" style={{margin:'2px'}} onClick={() => props.props.incrementQty(item)} >+</span>
                                        <span className="btn btn-info">{item.qty}</span>
                                        <span className="btn btn-primary" style={{margin:'2px'}} onClick={() =>item.qty > 1 ?  props.props.decrementQty(item) : props.props.removeToStoreHandler(item.products._id)}>-</span>
                                    </td>
                                    <td>{parseInt(item.products.price) * parseInt(item.qty)}</td>

                                </tr>

                            )
                        })
                        :
                        <div>
                            <h1 className="text-danger">There are no item in store.....</h1>
                        </div>

                }

                </tbody>
            </table>
            <div>
                <p>Total Products In Store :{props.storeProduct.length}</p>
            </div>
            <div>
                <p>Total Price : {props.storeProduct.map(items => parseInt(items.products.price) * parseInt(items.qty))
                    .reduce((acc, next) => acc + next, 0)}
                </p>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger mb-2" onClick={() => props.props.removeAllToStore(props.props.storeProduct)} >Clear Store</button>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mb-4">
                    <Link to="/Address" type="submit" value="Create User" className="text-white" style={{ textDecoration: 'none' }}>
                        Add Address
                    </Link>
                </button>
            </div>
        </div>
    )
};
export default AddStore;

