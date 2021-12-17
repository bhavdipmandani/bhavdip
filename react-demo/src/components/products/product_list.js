import React, { useEffect, useState } from 'react'
import { Card, CardGroup, Row, Form, FormControl } from 'react-bootstrap';
import './prolist.css';
import Retailer_footer from './Retailer_footer';
import { apiUrl } from '../../config';
import Helper from '../../helper';

const Product_list = (props) => {
    // For listing Data from api..

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    let Data = async () => {

        const response = await fetch(`${apiUrl}/public/product`);
        let productData = await response.json();
        return productData;
    }

    useEffect( () => {
        Data().then(((data) => setData(data.data.ProductList) ));
    },[]);


     // ------------------------------


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

                                        <button className="btn btn-primary" onClick = {() => props.props.addToCartHandler(item)}>
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

