import React, { useState } from 'react';
import './producer.css';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function Hall() {
  const [validated, setValidated] = useState(false);

  const handleBuyProduct = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const elements = event.target.elements;
    const orgname = elements.orgname.value;
    const username = elements.username.value;
    const prodID = elements.prodid.value;

    // Send post request
    fetch('http://localhost:3000/products/buyProduct', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        org: orgname,
        user: username,
        prodID: prodID,
      })
    })

    setValidated(true);
  };

  return (
    <div className='Producer'>

      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Foodchain!</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/producer">Producer</Nav.Link>
          <Nav.Link href="/logistic">Logistic</Nav.Link>
          <Nav.Link href="/inspector">Inspector</Nav.Link>
          <Nav.Link href="/hall">Hall</Nav.Link>
          <Nav.Link href="/market">Market</Nav.Link>
          <Nav.Link href="/consumer">Consumer</Nav.Link>
        </Nav>
      </Navbar>


      <h2 className='list-head'>Buy product</h2>
      <div className='prod-form'>
        <Form onSubmit={handleBuyProduct}>
          <Form.Row>
            <Col>
              <Form.Control name="orgname" placeholder="Org" />
            </Col>
            <Col>
              <Form.Control name="username" placeholder="Username" />
            </Col>
            <Col>
              <Form.Control name="prodid" placeholder="Product ID" />
            </Col>
            <Button variant="primary" type="submit" style={{ width: "90px" }}>
              Buy
            </Button>
          </Form.Row>
        </Form>
      </div>

      <footer>
        <div className='footer'>
          <p>
            🍇 = FDC
          </p>
          Built{' '}
          <span role='img' aria-label='love'>
            💚
          </span>{' '}
          with by Ömer K, Caner E, Ünal A.
        </div>
      </footer>
    </div>
  );
}
export default Hall;