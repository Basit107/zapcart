import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="lead mb-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg shadow">
        ⬅ Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
