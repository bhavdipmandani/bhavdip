// import React from 'react'
// import {Navbar, Nav, Container} from 'react-bootstrap';
// import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
//
// const Retailer_header = (props) => {
//     // For logout users
//     const logout = () => {
//
//         localStorage.clear();
//         window.location.reload(false);
//
//     }
//
//     return (
//         <div>
//             {/* Navbar Start */}
//             <Navbar bg="light" expand="lg">
//                 <Container fluid>
//                     <Navbar.Brand href="#">Something Purchase</Navbar.Brand>
//
//                     <Navbar.Toggle aria-controls="navbarScroll"/>
//                     <Navbar.Collapse id="navbarScroll">
//                         <Nav
//                             className="me-auto my-2 my-lg-0"
//                             style={{maxHeight: '100px'}}
//                             navbarScroll> </Nav>
//
//                         <Router>
//                             <Link to="/AddStore">userStore</Link>
//                         </Router>
//
//                         <button onClick={logout} className="btn btn-primary ms-4">Logout</button>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//
//             {/* End Nav Bar */}
//         </div>
//     )
// }
//
// export default Retailer_header;


import React, {useState} from "react";

import Product_list from "./product_list";
import AddStore from "./store";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import './header.css';
import Login from "../login/login";
import Register from "../register/register";
import Home from "./Home";
import Address from "./address";
import axios from "axios";


const Retailer_header = (props) => {
    const history = useHistory()

    const logout = () => {

        localStorage.removeItem('login');
        window.location.reload(false);

        history.push("/login")
    }

    const [user, setLoginUser] = useState({})
    return (
        <>
            <Router>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <Link to="/" className="logo text-dark">
                                Something Purchase
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbarScroll"/>

                        {/*<Navbar.Collapse id="navbarScroll">*/}

                            <Nav>

                                {/*<div className="me-4">*/}
                                    <Link to="/login" className="me-4 text-dark">Login</Link>
                                {/*</div>*/}
                                {/*<div className="me-4">*/}
                                    <Link to="/register" className="me-4 text-dark">Register</Link>
                                {/*</div>*/}
                                {/*<div className="me-4">*/}
                                    <Link to="/product_list" className="me-4 text-dark">Products</Link>
                                {/*</div>*/}
                                {/*<div className="me-4">*/}
                                <Link to="/AddStore" className="me-4 text-dark"><i className="fas fa-store text-dark"></i><p className="productCount">{props.storeProduct.length}</p></Link>
                                {/*</div>*/}

                                {/*<button onClick={logout} className="btn btn-primary ms-4">Logout</button>*/}

                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button"
                                            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"  >
                                        Bhavdip Mandani

                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {/*<li><a className="dropdown-item" href="#">Action</a></li>*/}
                                        {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                                        <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                    </ul>
                                </div>
                            </Nav>

                        {/*</Navbar.Collapse>*/}

                    </Container>

                </Navbar>

                <Switch>
                    {/*<Route path="/home">*/}
                    {/*    <Home />*/}
                    {/*</Route>*/}
                    <Route exact path="/">
                        {/*{*/}
                        {/*    user && user._id ? <AddProduct setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />*/}
                        {/*}*/}

                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login setLoginUser={setLoginUser} />
                    </Route>

                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/AddStore">
                        <AddStore storeProduct={props.storeProduct} props={props} />
                    </Route>

                    <Route path="/product_list">
                        <Product_list props={props}/>
                    </Route>

                    <Route path="/address">
                        <Address props={props}/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

// export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
export default Retailer_header;
