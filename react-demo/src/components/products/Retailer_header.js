import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardGroup, Navbar, Row, Nav, Container, Modal, Button, Form, FormControl } from 'react-bootstrap';
// import './prolist.css';
const Retailer_header = () => { 

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