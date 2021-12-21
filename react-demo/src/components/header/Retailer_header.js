import React, {useState, useEffect} from "react";

import Product_list from "../products/product_list";
import AddStore from "../store/store";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap';
import SingleProduct from "../products/singleProduct";
import '../../assets/css/header.css';
import Login from "../login/login";
import Register from "../register/register";
import Home from "../home/Home";
import Checkout from "../checkout/checkout"
import Address from "../address/address";
import Payment from "../checkout/payment";


const Retailer_header = (props) => {
    // console.log(props)
    // const history = useHistory()
    const [user,setUser] = useState({});
    useEffect( () => {

        setInterval(() => {
            const userString = localStorage.getItem('Token');
            // const user = JSON.parse(userString);
            setUser(userString)
        },[])
    },5000);
    const logout = () => {

        localStorage.removeItem('Token');
        localStorage.removeItem("Name");
        localStorage.removeItem("Id");

        window.location.reload(false);
        window.location.href = './login';
    }

    const getMenu =  () => {
        return (

            user ? <>
                <Link to="/product_list" className="me-4 text-dark" style={{ textDecoration: 'none' }}>Products</Link>
                <Link to="/AddStore" className="me-4 text-dark" style={{ textDecoration: 'none' }}><i className="fas fa-store text-dark"></i><p
                    className="productCount">{props.storeProduct.length}</p></Link>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button"
                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {userName}

                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </> : <>
                <Link to="/login" className="me-4 text-dark" style={{ textDecoration: 'none' }}>Login</Link>
                <Link to="/register" className="me-4 text-dark" style={{ textDecoration: 'none' }}>Register</Link>
                <Link to="/product_list" className="me-4 text-dark" style={{ textDecoration: 'none' }}>Products</Link>

                <Link to="/AddStore" className="me-4 text-dark" style={{ textDecoration: 'none' }}><i className="fas fa-store text-dark"></i><p
                    className="productCount">{props.storeProduct.length}</p></Link>

                {/*<div className="dropdown">*/}
                {/*    <button className="btn dropdown-toggle" type="button"*/}
                {/*            id="dropdownMenuButton1" data-bs-toggle="dropdown"*/}
                {/*            aria-expanded="false">*/}
                {/*        {userName}*/}

                {/*    </button>*/}

                {/*    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">*/}
                {/*        <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </>
        )
    }

    const [users, setLoginUser] = useState({})

    const userName = localStorage.getItem('Name');
    return (
        <>
            <Router>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <Link to="/" className="logo text-dark" style={{ textDecoration: 'none' }}>
                                Something Purchase
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbarScroll"/>

                        <Nav>
                            { getMenu() }
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

                        <Home props={props}/>
                    </Route>
                    <Route path="/login">
                        <Login setLoginUser={setLoginUser}/>
                    </Route>

                    <Route path="/register">
                        <Register/>
                    </Route>

                    <Route path="/AddStore">
                        <AddStore storeProduct={props.storeProduct} props={props}/>
                    </Route>

                    <Route path="/product_list">
                        <Product_list props={props}/>
                    </Route>

                    <Route path="/address">
                        <Address props={props}/>
                    </Route>

                    <Route path="/checkout">
                        <Checkout props={props}/>
                    </Route>

                    <Route path="/singleProduct">
                        <SingleProduct props={props}/>
                    </Route>

                    <Route path="/payment">
                        <Payment props={props}/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

// export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
export default Retailer_header;
