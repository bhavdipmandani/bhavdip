import React, {useEffect, useState} from "react";
import Retailer_footer from "../footer/Retailer_footer";
import {apiUrl} from "../../config";
import Helper from '../../helper';
import {Card, CardGroup, Form, FormControl, Row} from "react-bootstrap";
import '../../assets/css/home.css'
import {Link, useHistory} from 'react-router-dom';

// export const productId =  (item) => {
//
//     // const resp = await fetch(`${apiUrl}/public/product`);
//     // const singleProduct = await resp.json();
//     // console.log(singleProduct.data.ProductList[0]._id)
//     //
//     // return singleProduct.data.ProductList.map((item) => item)
//     return item;
//
//     // history.push('/singleProduct')
//
// }

const Home = (props) => {
    const history = useHistory();

    const [data, setData] = useState([])
    const [single, setSingle] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const Data = async () => {

        const response = await fetch(`${apiUrl}/public/product`);
        const productData = await response.json();
        // console.log(productData)
        return productData;

    }


    useEffect(() => {
        Data().then(((data) => setData(data.data.ProductList)));
    }, []);

    return (
        <div>
            <div>
                <h1 align="center" className="mt-4">Welcome TO Demo-Project</h1>
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <Form className="me-3">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"
                                         onChange={event => setSearchTerm(event.target.value)}/>
                        </Form>
                    </div>
                    <hr/>
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
                                    <Card style={{margin: "10px", width: "24rem"}}>
                                        <div>
                                        </div>
                                        <Card.Title className="mt-3 ms-3" align="center" >
                                            <Link to={{
                                                pathname: '/singleProduct', state: {item}
                                            }}  style={{ textDecoration: 'none' , color: 'black'}}>{item.product_name}</Link>

                                        </Card.Title>
                                        <hr/>
                                        <Link to={{pathname: '/singleProduct', state: {item} }} style={{ textDecoration: 'none' , color: 'black'}}>
                                            <Card.Img variant="top" src={Helper.getImageUrl(item.image)} style={{height: "180px", width: "310px"}} className="mt-3 ms-3"/>
                                        </Link>
                                        <hr/>
                                        <Card.Body>
                                            <Card.Text>
                                                <Link to={{pathname: '/singleProduct', state: {item} }} style={{ textDecoration: 'none' , color: 'black'}}>
                                                    {item.categories}
                                                </Link>
                                            </Card.Text>
                                            <Card.Text>
                                                <Link to={{pathname: '/singleProduct', state: {item} }} style={{ textDecoration: 'none' , color: 'black'}}>
                                                    {item.description}
                                                </Link>
                                            </Card.Text>
                                            <Card.Text>
                                                <Link to={{pathname: '/singleProduct', state: {item} }} style={{ textDecoration: 'none' , color: 'black'}}>
                                                    {item.price}
                                                </Link>
                                            </Card.Text>
                                            <hr />
                                            <div className="sub-main">
                                                <button className="store" type="submit" onClick = {() => props.props.addToCartHandler(item)}>
                                            <span>
                                            Add To Store
                                           </span>
                                                </button>
                                            </div>
                                        </Card.Body>

                                    </Card>
                                </Row>
                            )}

                        </CardGroup>

                    </div>
                </div>
            </div>
            <Retailer_footer/>
        </div>
    )
}

export default Home;
