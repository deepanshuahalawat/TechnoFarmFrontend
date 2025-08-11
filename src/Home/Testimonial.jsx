// src/components/TestimonialSlider.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import your CSS file for styling
import './Testiminail.css';

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,           // Enables auto sliding
    autoplaySpeed: 3000,      // Auto slide every 3 seconds
    arrows: false,            // Hides the navigation arrows
  };

  // Array of image URLs (replace with your actual image paths)
  const testimonialImages = [
    'r1.png',
    'r2.png',
    'r3.png',
    'r4.png',
    'r5.png',
    'r6.png',
    'r7.png',
    'r8.png',
    'r9.png',
  ];

  return (
    <div className="testimonial-section bg-zinc-100">
      <div className="container">
        <img src="./r10.png" alt="TechnoFarm Review 5 star" />
        <Slider {...settings}>
          {testimonialImages.map((image, index) => (
            <div key={index} className="testimonial-slide">
              <img src={image} alt={`TechnoFarm Testimonial ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
