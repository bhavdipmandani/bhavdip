import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardGroup, Navbar, Row, Nav, Container, Modal, Button, Form, FormControl } from 'react-bootstrap';
import './prolist.css';
const Retailer_header = () => {

    // For listing Data from api..
    const [data, setData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    


    // For logout users

    const logout = () => {

        localStorage.clear();
        window.location.reload(false);

    }


    return (
        <div>
            {/* Navbar Start */}
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Something Purchase</Navbar.Brand>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll> </Nav>


                        {/* ---------- Search bar ---------- */}

                        <Form>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => setSearchTerm(event.target.value)} />
                        </Form>

                        {/* <div className="ms-3">
                            <Button variant="outline-success" type="submit">Search</Button>
                        </div> */}


                        {/* -------------- End Search Bar -------------- */}


                        <button onClick={logout} className="btn btn-primary ms-4">Logout</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* End Nav Bar */}
        </div>
    )
}

export default Retailer_header;