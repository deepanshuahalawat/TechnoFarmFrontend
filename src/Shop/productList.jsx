// src/components/ProductList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import products from './ProductJson';
import './ProductList.css'; // Import the custom CSS file
import ProductSlider from './ImageSlider/slider';

const ProductList = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center font-bold text-4xl mb-5">Our Product List</h1>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-6" key={index}>
            <div className="card mb-5 product-card">
              <div className="card-top">
                <ProductSlider images={product.images} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.productTitle}</h5>
                <p className="card-text single-line">{product.productDescription}</p>
                <p className="card-text mt-2"><strong>Price:</strong> ₹{product.productPrice}</p>
                <p className="card-text mt-2"><strong>For purchase or dealership contact:</strong><br /> {product.contactNumber}</p>
                <Link to={`/product/${product.Id}`} className="btn bg-yellow-400 mt-3">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
