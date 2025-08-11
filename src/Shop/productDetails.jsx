// src/components/ProductDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import products from './ProductJson';
import ProductSlider from './ImageSlider/slider';
import './productDetail.css';
import NavBarCom from '../NavBr/NavBrCom';

const ProductDetail = ({ propsId }) => {
  // Use useParams to get the id from the URL
  const { id: paramId } = useParams();

  // Determine which ID to use: prefer propsId, fall back to paramId
  const productId = propsId ? parseInt(propsId) : parseInt(paramId);

  // Find the product based on the determined ID
  const product = products.find(p => p.Id === productId);

  if (!product) {
    return <div><br /><hr /></div>;
  }

  return (
    <div>
       {/* <NavBarCom /> */}
   
    <div className="container mt-5">
      <h1 className="text-center font-bold text-4xl mb-5">{product.productTitle}</h1>
      <div className="row">
        <div className="col-md-6">
          <ProductSlider images={product.images} />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title font-bold text-2xl mb-3">{product.productTitle}</h5>
            <p className="card-text">{product.productDescription}</p>
            <p className="card-text "><strong>Price:</strong> <span className='text-2xl mx-4 my-2' style={{ color: 'green' }}>₹{product.productPrice}</span></p>
            <ul className="list-group list-group-flush">
              <p className="card-text"><strong>Features:</strong></p>
              {product.features.map((feature, idx) => (
                <div className="ml-2" key={idx}>
                  <li>{idx + 1}. {feature}</li>
                </div>
              ))}
            </ul>
            <p className="card-text mt-2"><strong>For purchase or dealership contact:</strong><br /> {product.contactNumber}</p>
            <a className='mt-3 btn bg-yellow-400' href={`https://wa.me/${product.contactNumber}`}>
              <span className="fa fa-brands fa-whatsapp" /> Order on Whatsapp
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;
