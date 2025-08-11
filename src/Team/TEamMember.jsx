import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TeamComponent.css';

const teamMembers = [
  {
    id: 1,
    image: './harendraSingh.jpg',
    name: 'Harendra Singh',
    position: 'Co-founder',
    bio: 'Visionary leader with 15+ years of industry experience driving strategic growth.'
  },
  {
    id: 2,
    image: './rakesh.jpg',
    name: 'Rakesh Deman',
    position: 'Co-founder',
    bio: 'Operations expert specializing in scaling businesses efficiently.'
  },
  {
    id: 3,
    image: './Team_mem.jpg',
    name: 'Gurvinder Singh',
    position: 'Marketing Head',
    bio: 'Digital marketing strategist with a track record of successful campaigns.'
  },
];

const TeamComponent = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-heading">Meet Our Leadership</h2>
          <p className="team-subheading">
            Our management team combines visionary leadership with hands-on expertise to drive our company forward.
          </p>
        </div>
        
        <div className="team-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: '.team-swiper-button-next',
              prevEl: '.team-swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.team-swiper-pagination',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }}
            className="team-swiper"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="team-member-card">
                  <div className="member-image-container">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="member-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                    <p className="member-bio">{member.bio}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="team-swiper-controls">
            <div className="team-swiper-pagination"></div>
            <div className="team-swiper-navigation">
              <button className="team-swiper-button-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="team-swiper-button-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamComponent;