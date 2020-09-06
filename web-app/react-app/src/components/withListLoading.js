import React from 'react';
import { Spinner } from 'react-bootstrap';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <div>
        <p style={{ textAlign: 'center', fontSize: '30px' }}>
          Hold on, fetching data from Blokchain network.
      </p>

        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <Spinner animation="grow" />
      </div>
    );
  };
}
export default WithListLoading;
