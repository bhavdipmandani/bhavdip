import React, { useEffect, useState } from 'react'
import { Card, CardGroup, Navbar, Row, Nav, Container, Form, FormControl } from 'react-bootstrap';
import './prolist.css';
import Retailer_footer from './Retailer_footer';
import Retailer_header from './Retailer_header';
import axios from 'axios';
import { apiUrl } from '../../config';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Product_list = ({ store, setStore }) => {

    // For listing Data from api..
    const [data, setData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    // const [selectproduct , setSelectproduct] = useState('')
    const fetchURL = `${apiUrl}/product`
    console.log(fetchURL)
    const getData = () =>
        fetch(`${fetchURL}`)
            .then((res) => res.json())

    useEffect(() => {
        getData().then((data) => setData(data.data.products))

    }, []
    )


    // For logout users

    // const logout = () => {

    //     localStorage.clear();
    //     window.location.reload(false);

    // }

    // ------------------------------


    // -------------- send data to store ------------------


    const handleclick = (productInfo) => {
        axios.post('http://localhost:8000/storeporduct')
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });
        let newStore = [...store];
        console.log(newStore)
      

        axios.patch('http://localhost:8000/getstoredproduct/:_id', newStore, {
            new: true,
        });


        // console.log(newStore)
        let itemInStore = newStore.find(
            (item) => item.product_name === productInfo.product_name
        );
        if (itemInStore) {
            itemInStore.quantity++;
        } else {
            itemInStore = {
                ...productInfo,
                quantity: 1,
            };
            newStore.push(itemInStore);
        }
        setStore(newStore);
        // console.log(...store)
    };

    return (

        <div>
            {/* Navbar Start */}
            {/* <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Something Purchase</Navbar.Brand>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll> </Nav>

                        <button onClick={logout} className="btn btn-primary">Logout</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}


            <Retailer_header />
            {/* End Nav Bar */}


            {/* Display Product in Card */}

            {/* <Products /> */}

            <div className='col-md-6'>
                <h1>Product Data From-Api</h1>
            </div>
            <div className="d-flex justify-content-end">
                <Form>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => setSearchTerm(event.target.value)} />
                </Form>

            </div>

            <div className="container">

                <hr />
                <div>

                    <CardGroup>
                        {data?.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.product_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((item) =>
                            <Row className="ms-3">
                                <Card style={{ margin: "10px", width: "24rem" }}>
                                    <div>
                                    </div>
                                    <Card.Title className="mt-3 ms-3" align="center">{item.product_name}</Card.Title>
                                    <hr />
                                    <Card.Img variant="top" src={item.image} style={{ height: "180px", width: "310px" }} className="mt-3 ms-3" />
                                    <hr />
                                    <Card.Body>
                                        <Card.Text>
                                            {item.categories}
                                        </Card.Text>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Card.Text>
                                            {item.price}
                                        </Card.Text>
                                        <hr />
                                        <button type="submit" className="btn btn-primary mt-4 me-4" onClick={() => handleclick(item)}>
                                            {/* <Link to="/AddStore" type="submit" value="Create User" className="btn btn-primary" > */}
                                            Add to Store
                                            {/* </Link> */}
                                        </button>
                                        <hr />
                                    </Card.Body>

                                </Card>
                            </Row>

                        )}

                    </CardGroup>


                </div>
            </div>

            {/* End Card */}


            {/* Footer Part */}

            <Retailer_footer />

            {/* End Footer   */}
        </div>
    )
}

export default Product_list;

