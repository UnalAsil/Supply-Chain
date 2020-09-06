import React, { useState } from 'react';
import './producer.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Consumer() {
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


      <div className='repo-container'>
        <h3>This is consumer page.</h3>
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
export default Consumer;