import React, { useEffect, useState } from 'react'
import { Card, CardGroup, Navbar, Row, Nav, Container, Form, FormControl } from 'react-bootstrap';
import './prolist.css';
import Retailer_footer from './Retailer_footer';
import axios from 'axios';
import { apiUrl } from '../../config';
import Helper from '../../helper';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Product_list = ({ store, setStore , props}) => {
    console.log(props)
    // For listing Data from api..
    const [data, setData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchURL = `${apiUrl}/public/product`;
    const getData = () =>
        fetch(`${fetchURL}`)
            .then((res) => res.json())

    useEffect(() => {
        getData().then((data) => setData(data.data.products))

    }, []
    )


     // ------------------------------


    // -------------- send data to store ------------------


    // const handleclick = () => {
    //     axios.post('http://localhost:8000/api/v1/store')
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((error) => {
    //         console.log(error)
    //     });
    //
    //
    //     // axios.patch('http://localhost:8000/api/v1/store/:_id',{
    //     //     new: true,
    //     // });
    //
    //
    // };

    return (

        <div>

            {/* Display Product in Card */}


            <div className='col-md-6 ms-3'>
                <h1>Product Data</h1>
            </div>
            <div className="d-flex justify-content-end">
                <Form className="me-3">
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
                                    <Card.Img variant="top" src={Helper.getImageUrl(item.image)} style={{ height: "180px", width: "310px" }} className="mt-3 ms-3" />
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

                                        <button className="btn btn-primary" onClick = {() => props.addToCartHandler(item)}>
                                            {/*<p onClick={handleclick} className="mt-3">*/}
                                            Add To Store
                                            {/*</p>*/}
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

