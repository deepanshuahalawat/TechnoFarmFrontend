// src/components/ServicePage.jsx

import React from 'react';
import './Service.css'; // Import your CSS for styling
import "/src/Home/Aboutus/AboutUs.css"; // Optional: for custom styling
import NavBarCom from '../NavBr/NavBrCom';
const Service = () => {
  return (
    <div>
         {/* <NavBarCom /> */}
      <div className="service-page">
      <div className="service-header">
        <h2

          className="ml-72  rounded  font-bold text-5xl z-10 absolute "
        >
          Welcome to TechnoFarm

        </h2>
        <p
          className="bg-yellow-300 absolute  left-0 transform -translate-y-1/2 z-1"
          style={{ width: 400, height: 15, marginLeft: "400px", top: 138 }}
        ></p>
        <p className='pt-20 text-black font-bold'>Your trusted partner for custom embedded electronics and software projects.</p>
      </div>
      <hr />
      <h2 className='absolute font-bold text-3xl z-10 mt-10'>Our Services</h2>
      <p
        className="bg-yellow-300 absolute  left-0 transform -translate-y-1/2 z-1"
        style={{ width: 130, height: 7, marginLeft: "50px", top: 307 }}
      ></p>
      <div className="service-details pt-20">

        <div className="service-card  ">
          <h3 className='bg-blue-50 w-fit px-4 rounded-md py-1'>Custom Embedded Electronics</h3>
          <p>
            We specialize in building custom embedded electronics hardware, including microcontroller-based PCBs and other embedded projects. Whether you need a complete product design or just a specific component, we have the expertise to bring your vision to life.
          </p>
        </div>

        <div className="service-card">
          <h3 className='bg-blue-50 w-fit px-4 rounded-md py-1'>Software Solutions</h3>
          <p>
            Our team can handle software projects related to electronics and other domains. From firmware development to desktop and mobile applications, we provide comprehensive software solutions that integrate seamlessly with your hardware.
          </p>
        </div>
      </div>

      <div className="contact-section">
        <p>Have any questions? Feel free to reach out to us on WhatsApp!</p>
        <a href="https://wa.me/8126967580" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
          <img src="./WhatsApp_logo-color-vertical.svg.png" alt="WhatsApp" className="whatsapp-icon" />
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
    </div>
  );
};

export default Service;
