// src/components/ProductSlider.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.css'; // Custom styles for the slider

const ProductSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className=' place-items-center ' style={{display:"flex",justifyContent:"center",alignContent:"center",paddingLeft:50}}>
          <img src={`/${image} `} alt={`Product ${image} `} className="slider-image " />
        </div>
      ))}
    </Slider>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next bg-slate-500 rounded" style={{paddingTop :1}} onClick={onClick}>
    
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev bg-slate-500 rounded" style={{paddingTop :1}} onClick={onClick}>

    </div>
  );
};

export default ProductSlider;
