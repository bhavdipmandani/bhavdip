// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import { connect } from "react-redux";
// import Retailer_footer from './Retailer_footer';
// import {useSelector} from "react-redux";
// import { Card, CardGroup, Navbar, Row, Nav, Container, Form, FormControl } from 'react-bootstrap';
//
// function AddStore({ store, setStore }) {
//
//    // Create handleIncrement event handler
//    const [searchTerm, setSearchTerm] = useState('')
//
//    const handleIncrement = (itemIn) => {
//       let newstore = [...store]
//       newstore.find((product) => product.product_name === itemIn.product_name).quantity += 1
//       setStore(newstore);
//    };
//
//    //Create handleDecrement event handler
//
//    const handleDecrement = (itemDic , productToRemove) => {
//       let newstore = [...store]
//       newstore.find((product) => product.product_name === itemDic.product_name).quantity == 1 ? newstore.filter((product) => product != itemDic) :
//          newstore.find((product) => product.product_name === itemDic.product_name).quantity -= 1;
//       // setStore(newstore);
//
//       setStore(
//          newstore,
//          store.filter((product) => product !== productToRemove)
//       );
//    };
//
//    const removeFromCart = (productToRemove) => {
//       setStore(
//          store.filter((product) => product !== productToRemove)
//       );
//    };
//
//    const clearCart = () => {
//       setStore([]);
//    };
//
//    const getTotalSum = () => {
//       return store.reduce(
//          (sum, { price, quantity }) => sum + price * quantity,
//          0
//       );
//    };
//
//    const logout = () => {
//
//       localStorage.clear();
//       window.location.reload(false);
//
//    }
//
//    return (
//       <div>
//          <Navbar bg="light" expand="lg">
//             <Container fluid>
//                <Navbar.Brand href="#">Something Purchase</Navbar.Brand>
//
//
//                <Navbar.Toggle aria-controls="navbarScroll" />
//                <Navbar.Collapse id="navbarScroll">
//                   <Nav
//                      className="me-auto my-2 my-lg-0"
//                      style={{ maxHeight: '100px' }}
//                      navbarScroll> </Nav>
//
//
//                   <div className="me-3">
//                      <Form>
//                         <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => setSearchTerm(event.target.value)} />
//                      </Form>
//                   </div>
//
//
//
//                   <button onClick={logout} className="btn btn-primary">Logout</button>
//                </Navbar.Collapse>
//             </Container>
//          </Navbar>
//          <h1 align="center" className="mt-4">Retailer's Store</h1>
//
//          <div className="container">
//             {store.length > 0 && (
//                <button className="btn btn-danger mb-4" onClick={clearCart}>Clear Store</button>
//             )}
//             <table className="table">
//
//                <thead>
//                   <tr>
//                      <th>Delete Product</th>
//                      <th>Product_Name</th>
//                      <th>Categories</th>
//                      <th>Image</th>
//                      <th>Description</th>
//                      <th>Quantity</th>
//                      <th>Price</th>
//                   </tr>
//                </thead>
//
//                <tbody>
//                   {
//                      store.filter((val) => {
//                         if (searchTerm === "") {
//                            return val;
//                         } else if (val.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
//                            return val
//                         }
//                      }).map((item) => {
//                         return (
//                            <tr>
//                               <td><i className="badge badge-danger" onClick={() => removeFromCart(item)}>X</i></td>
//                               <td>{item.product_name}</td>
//                               <td>{item.categories}</td>
//                               <td><img src={item.image} style={{ width: '100px', height: '80px' }} /></td>
//                               <td>{item.description}</td>
//                               <td>
//                                  <span className="btn btn-primary" style={{ margin: '2px' }} onClick={() => handleDecrement(item)}>-</span>
//                                  <span className="btn btn-info">{item.quantity}</span>
//                                  <span className="btn btn-primary" style={{ margin: '2px' }} onClick={() => handleIncrement(item)}>+</span>
//
//                               </td>
//                               <td>{parseInt(item.price) * parseInt(item.quantity)}</td>
//
//
//                            </tr>
//
//                         )
//                      })
//
//                   }
//
//                   <tr>
//                      <div className="text-2xl">
//                         Total Price: ${getTotalSum()}
//                         <p className="mt-8">
//                         </p>
//                      </div>
//                   </tr>
//                </tbody>
//             </table>
//
//             <div className="d-flex justify-content-end">
//                <button type="submit" className="btn btn-primary mt-4 mb-4"><Link to="/Address" type="submit" value="Create User" className="btn btn-primary" >
//                   Add Address</Link></button>
//
//             </div>
//          </div>
//          {/* Footer Part */}
//
//          <Retailer_footer />
//
//          {/* End Footer   */}
//       </div>
//
//    )
//
// }
//
//
// export default AddStore;

// import {useSelector} from "react-redux";

import React from "react";

import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

const AddStore = (props) => {
    // console.log(props)
    const removeFromCart = () => {
        localStorage.removeItem('persist:root');
        window.location.reload(false);
    };
    // const removeByIndex = (index) => {
    //       props.storeProduct.filter((id) => id !== index)
    // };

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
                    <th>Price</th>
                </tr>
                </thead>

                <tbody>
                {
                    props.storeProduct.length > 0 ?
                        props.storeProduct.map((item) => {
                            return (
                                <tr>
                                    {/*<td>*/}
                                    {/*    <button className="badge badge-danger" onClick={() => removeByIndex(item)}>X</button>*/}
                                    {/*</td>*/}
                                    <td className="cart-remove"
                                        onClick = {() => props.props.removeToCartHandler(item.products._id)}
                                    ><button className="badge badge-danger">X</button></td>
                                    <td>{item.products.product_name}</td>
                                    <td>{item.products.categories}</td>
                                    <td><img src={item.products.image} style={{width: '100px', height: '80px'}}/></td>
                                    <td>{item.products.description}</td>
                                    <td>{item.products.price}</td>

                                </tr>

                            )
                        })
                        :
                        <div>
                            <h1 className="text-danger">There are no item in store....</h1>
                        </div>

                }

                </tbody>
            </table>
            <div>
                <p>Total Products In Store :{props.storeProduct.length}</p>
            </div>
            <div>
                <p>Total Price : {props.storeProduct.map(items => items.products.price)
                    .reduce((acc, next) => acc + next, 0)}
                </p>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger mb-2" onClick={removeFromCart}>Clear Store</button>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mb-4">
                    <Link to="/Address" type="submit" value="Create User" className="btn btn-primary">
                        Add Address
                    </Link>
                </button>
            </div>
        </div>
    )
};
export default AddStore;

