// src/AboutUs.js
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import "./AboutUs.css"; // Optional: for custom styling
import TeamComponent from "../../Team/TEamMember";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NavBarCom from "../../NavBr/NavBrCom";
const teamMembers = [
  {
    id: 1,
    image: './harendraSingh.jpg',
    name: 'Harendra Singh',
    position: 'Marketing and Sales',
    info:'Harendra Singh holds a masters degree in Agriculture. He has experiance of working in many fields including Agriculture, Cane and Petroleum industries. He is handling the Sales and Marketing department here in Technofarm. He has a total experiance of more than 30 years.',
    phone:"+91 6398589793",
  },
  {
    id: 2,
    image: './rakesh.jpg',
    name: 'Rakesh Deman',
    position: 'Production and Quality',
    info:"Mr. Rakesh Dhiman is working in the field of technology for more than 35 years. He has many contributions towards science and Technology. He has expertise in the field of Production.He is handling the Production and Quality department here in Technofarm.",
    phone:"+91 9997044372",
  },

];

const AboutUs = () => {
  return (
    <div>
   {/* <NavBarCom /> */}
      <div className="about-us">
        <div className="aboutUsInfo ">
          <h1
            id="headingAbout"
            className="underline decoration-yellow-300 md:decoration-yellow-300 rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold"
          >
            About
          </h1>
          <div className="relative">
            <h1 className="font-size: text-8xl line-height: text-2xl rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold text-3xl relative z-10">
              TechnoFarm
            </h1>
            <p
              className="bg-yellow-300 absolute  left-0 transform -translate-y-1/2 z-1"
              style={{ width: 400, height: 15, marginLeft: "400px", top: 78 }}
            ></p>
          </div>

          <br />
        </div>


      </div>

      <div>
        {" "}
        <h2
          id="headingAbout"
          className="text-gray-500 underline decoration-yellow-300 md:decoration-yellow-300 rounded ml-16     mt-20  font-bold text-3xl"
        >

        </h2>
      </div>

      
      <div className="mt-20">

      </div>
      <div>
        <h2
          id="headingAbout"
          className="ml-5 text-gray-500 underline decoration-yellow-300 md:decoration-yellow-300 rounded  mt-60   md:mt-20 font-bold text-3xl "
        >
          A brief introduction
        </h2>
        <p className="storySection ">
          <hr />
          <br />
          TECHNOFARM was founded in 2018 by two FARMERS. It is technology based company aimed to deliver most reliable and technologically advanced products.
          We mainly deal in agricultural electronic products . We are situated in Village Rahakra, Muzaffarnagar UP. Being farmer, we can understand the problems of a farmer and we design our products accordingly. You can visit our manufaturing facility anytime in Rahakra.
        </p>
      </div>
      <div className="relative ml-5">
        <h1 className="font-size: text-2xl font-bold text-left mt-5 absolute text-3xl  z-10">
        Meet our Co-founders  
        </h1>
       
        <p
          className="bg-yellow-300 absolute  left-0 transform -translate-y-1/2 z-1"
          style={{ width: 200, height: 5, marginLeft: "30px", top: 75 }}
        ></p>
      
      </div>
      <p className="pt-28 pl-7 ">
        <hr />
        <p className="mt-3">
       

        <div className="responsive-container-block outer-container">
      <div className="responsive-container-block inner-container">
        <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-tab-12 wk-mobile-12">
         
          <p className="text-blk sub-heading-text">
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo enim risus sit nullam aliquam. Mattis. */}
           
            Our management team is composed of visionary leaders who bring a blend of strategic thinking and hands-on experience. They guide our company's direction and inspire us to achieve new heights every day. With a shared commitment to integrity, growth, and customer satisfaction, they are dedicated to leading our company towards a bright future.
          </p>
          
        </div>
        <div className="responsive-cell-block wk-desk-8 wk-ipadp-8 wk-tab-12 wk-mobile-12">
          
          <div className="">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-button-nexts',
                prevEl: '.swiper-button-prevs',
              }}
              loop={true}
              breakpoints={{
                100: { slidesPerView: 1.2, spaceBetween: 40 },
                340: { slidesPerView: 1.5, spaceBetween: 40 },
                500: { slidesPerView: 1.5, spaceBetween: 20 },
                630: { slidesPerView: 2, spaceBetween: 30 },
                769: { slidesPerView: 1.5, spaceBetween: 30 },
                890: { slidesPerView: 2, spaceBetween: 40 },
                1090: { slidesPerView: 2.5, spaceBetween: 40 },
              }}
              className=""
            >
              {teamMembers.map((member) => (
                 <SwiperSlide key={member.id}>
                 <div className>
                   <img style={{borderRadius:"50%"}} src={member.image} alt={member.name}/>
                   <p className="ml-16 text-blk name font-bold">{member.name}</p>
                   <p className="ml-16 position font-bold ">{member.position}</p>
                   <p className="text-center mt-4">{member.info}</p>
                   <p className="text-center mt-3 font-bold"> 📞 {member.phone}</p>
                 </div>
               </SwiperSlide>
              ))}
            </Swiper>
            <div className="btn">
              <div className="swiper-button-nexts">
                <img className="arrow-right-1" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg" alt="Next" />
              </div>
              <div className="swiper-button-prevs">
                <img className="arrow-left-1" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg" alt="Previous" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>


        </p>
        </p>
    </div>


  );
};

export default AboutUs;
