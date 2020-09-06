import React from 'react';
import '../index.css';

const List = (props) => {
  const { assets } = props;
  if (!assets || assets.length === 0) return <p>No assets, sorry</p>;
  return (
    <div>

      {assets.map((asset) => {
        return (
          <div key={asset.Key}>

            <div className="card" >
              <div className="card-body">
                {/* <h5 className="card-title">{asset.Record.ProductType}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Weigth: {asset.Record.Kilo} kg</h6>
                <h6 className="card-subtitle mb-2 text-muted">Price: {asset.Record.AppraisedValue} 🍇</h6>
                <h6 className="card-text"><b>ProdID:</b> {asset.Key}</h6> {"\n"}
                <h6 className="card-text"><b>OwnerID:</b> {asset.Record.OwnerID}</h6> */}

                <table>
                  <tbody>
                    <tr>
                      <th><h5 className="card-title float-left">{asset.Record.ProductType}</h5></th>
                    </tr>
                    <tr>
                      <td><h6 className="card-subtitle mb-2 text-muted float-left">Weigth: </h6></td>
                      <td><h6 className="card-subtitle mb-2 text-muted float-left">{asset.Record.Kilo} kg</h6></td>

                      <td><h6 className="card-subtitle mb-2 text-muted float-right">X: </h6></td>
                      <td><h6 className="card-subtitle mb-2 text-muted float-right">{asset.Record.Location.x}</h6></td>
                    </tr>
                    <tr>
                      <td><h6 className="card-subtitle mb-2 text-muted float-left">Price:</h6></td>
                      <td><h6 className="card-subtitle mb-2 text-muted float-left">{asset.Record.AppraisedValue} 🍇</h6></td>

                      <td><h6 className="card-subtitle mb-2 text-muted float-right">Y: </h6></td>
                      <td><h6 className="card-subtitle mb-2 text-muted float-right">{asset.Record.Location.y}</h6></td>
                    </tr>
                    <tr>
                      <td><h6 className="card-text float-left"><b>ProdID:</b></h6></td>
                      <td><h6 className="card-text float-right">{asset.Key}</h6></td>
                    </tr>
                    <tr>
                      <td><h6 className="card-text float-left"><b>OwnerID:</b></h6></td>
                      <td><h6 className="card-text float-right">{asset.Record.OwnerID}</h6></td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default List;
