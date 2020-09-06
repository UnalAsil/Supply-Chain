import React, { useEffect, useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';

import List from '../components/List';
import withListLoading from '../components/withListLoading';

const MainPage = () => {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    assets: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://localhost:3000/filterAssets/product`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((assets) => {
        setAppState({ loading: false, assets: assets });
      });
  }, [setAppState]);

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


      <h2 className='list-head'>Available products</h2>

      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} assets={appState.assets} />
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
};

export default MainPage;
