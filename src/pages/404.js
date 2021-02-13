import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="text-center p-4">
          <h1>404 - Not Found!</h1>
          <Link to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
