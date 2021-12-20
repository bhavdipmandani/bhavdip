import React, {useEffect, useState} from "react";
import Retailer_footer from "../footer/Retailer_footer";
import {apiUrl} from "../../config";
import {Card, CardGroup, Row} from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Helper from "../../helper";
const SingleProduct = (props , item) => {
    const location = useLocation()
    // console.log(location.state.item.product_name)

    return (
        <div>
            <div>
                <CardGroup>
                    {/*{data.map((item) =>*/}
                        <Row className="ms-3">
                            <Card style={{ margin: "10px", width: "24rem" }}>
                                <div>
                                </div>
                                <Card.Title className="mt-3 ms-3" align="center">{location.state.item.product_name}</Card.Title>
                                <hr />
                                <Card.Img variant="top" src={Helper.getImageUrl(location.state.item.image)} style={{ height: "180px", width: "310px" }} className="mt-3 ms-3" />
                                <hr />
                                <Card.Body>
                                    <Card.Text>
                                        {location.state.item.categories}
                                    </Card.Text>
                                    <Card.Text>
                                        {location.state.item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {location.state.item.price}
                                    </Card.Text>
                                </Card.Body>
                                <div className="sub-main">
                                    <button className="store" type="submit" onClick = {() => props.props.addToCartHandler(location.state.item)}>
                                            <span>
                                            Add To Store
                                           </span>
                                    </button>
                                </div>
                            </Card>
                        </Row>

                    {/*)}*/}

                </CardGroup>

            </div>

            <div>
                <Retailer_footer />
            </div>
        </div>
    )
}

export default SingleProduct;

