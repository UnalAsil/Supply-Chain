import React, { useState } from 'react';
import './producer.css';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function Producer() {

  const [validated, setValidated] = useState(false);

  const handleCreateProduct = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const elements = event.target.elements;
    const orgname = elements.orgname1.value;
    const prod_type = elements.prodtype1.value;
    const user_id = elements.username1.value;
    const weight = elements.weight1.value;
    const price = elements.price1.value;
    const locx = elements.locx1.value;
    const locy = elements.locy1.value;

    // Send post request
    fetch('http://localhost:3000/products/createProduct', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        org: orgname,
        user: user_id,
        type: prod_type,
        kilo: weight,
        price: price,
        x: locx,
        y: locy,
      })
    })

    setValidated(true);
  };

  const handleUpdatePrice = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const elements = event.target.elements;
    const orgname = elements.orgname2.value;
    const user_id = elements.username2.value;
    const prod_id = elements.prodid2.value;
    const new_price = elements.price2.value;

    // Send post request
    fetch('http://localhost:3000/update/productPrice', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        org: orgname,
        user: user_id,
        prodID: prod_id,
        newPrice: new_price,
      })
    })

    setValidated(true);
  };

  const handleHireInspector = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const elements = event.target.elements;
    const orgname = elements.orgname2.value;
    const username = elements.username2.value;
    const prodid = elements.prodid2.value;
    const inspectorid = elements.price2.value;

    // Send post request
    fetch('http://localhost:3000/inspector/hireInspector', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        org: orgname,
        user: username,
        prodID: prodid,
        inspectID: inspectorid,
      })
    })

    setValidated(true);
  };


  return (
    < div className='Producer' >

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

      <h2 className='list-head'>Create new product</h2>
      <div className='prod-form'>
        <Form onSubmit={handleCreateProduct}>
          <Form.Row>
            <Col>
              <Form.Control name="orgname1" placeholder="Org" />
            </Col>
            <Col>
              <Form.Control name="username1" placeholder="Username" />
            </Col>
            <Col>
              <Form.Control name="prodtype1" placeholder="Product Type" />
            </Col>
            <Col>
              <Form.Control name="weight1" placeholder="Weight (kg)" />
            </Col>
            <Col>
              <Form.Control name="price1" placeholder="Price (🍇)" />
            </Col>
            <Col>
              <Form.Control name="locx1" placeholder="Location X" />
            </Col>
            <Col>
              <Form.Control name="locy1" placeholder="Location y" />
            </Col>
            <Button variant="primary" type="submit" style={{ width: "90px" }}>
              Create
            </Button>

          </Form.Row>
        </Form>
      </div>


      <h2 className='list-head'>Update product price</h2>
      <div className='prod-form'>
        <Form onSubmit={handleUpdatePrice}>
          <Form.Row>
            <Col>
              <Form.Control name="orgname2" placeholder="Org" />
            </Col>
            <Col>
              <Form.Control name="username2" placeholder="Username" />
            </Col>
            <Col>
              <Form.Control name="prodid2" placeholder="Product ID" />
            </Col>
            <Col>
              <Form.Control name="price2" placeholder="New price (🍇)" />
            </Col>
            <Button variant="primary" type="submit" style={{ width: "90px" }} >
              Update
            </Button>
          </Form.Row>
        </Form>
      </div>

      <h2 className='list-head'>Hire inspector</h2>
      <div className='prod-form'>
        <Form onSubmit={handleHireInspector}>
          <Form.Row>
            <Col>
              <Form.Control name="orgname3" placeholder="Org" />
            </Col>
            <Col>
              <Form.Control name="username3" placeholder="Username" />
            </Col>
            <Col>
              <Form.Control name="prodid3" placeholder="Product ID" />
            </Col>
            <Col>
              <Form.Control name="inpsectorid3" placeholder="Inspector ID" />
            </Col>
            <Button variant="primary" type="submit" style={{ width: "90px" }}>
              Hire
            </Button>
          </Form.Row>
        </Form>
      </div>

      <h2 className='list-head'>Hire logistic</h2>
      <div className='prod-form'>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Org" />
            </Col>
            <Col>
              <Form.Control placeholder="Username" />
            </Col>
            <Col>
              <Form.Control placeholder="Product ID" />
            </Col>
            <Col>
              <Form.Control placeholder="Logistic ID" />
            </Col>
            <Button variant="primary" type="submit" style={{ width: "90px" }}>
              Hire
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
    </div >
  );
}
export default Producer;