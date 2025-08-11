import React from 'react'

function WhyChooseUs() {
  return (
    <div >
      {/* Start Why Choose Us Section */}
      <div className="why-choose-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <h2 className="section-title text-2xl font-bold">Why Choose Us</h2>
                <p>At TechnoFarm, we are dedicated to providing unparalleled products and services tailored to meet the specific needs of modern farming. Here's why you should choose us for your tube well motor protection and control solutions:</p>
                <div className="row my-5">
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src="truck.svg" alt="Image" className="imf-fluid" />
                      </div>
                      <h3 className='font-bold text-3xl'>Fast Shipping</h3>
                      <p>Enjoy fast and reliable shipping. We ensure that your products are delivered promptly, so you can get back to focusing on what matters most—running your farm.</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src="bag.svg" alt="Image" className="imf-fluid" />
                      </div>
                      <h3 className='font-bold text-3xl'>Easy to Shop</h3>
                      <p>Our user-friendly website makes it simple to browse, select, and purchase the right products for your needs. With intuitive navigation and detailed product information, shopping with us is a breeze.</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src="support.svg" alt="Image" className="imf-fluid" />
                      </div>
                      <h3 className='font-bold text-3xl'>24/7 Support</h3>
                      <p>Our dedicated support team is available 24/7 to assist you with any questions or issues. Whether you need technical support or product advice, we are here to help at any time.</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src="return.svg" alt="Image" className="imf-fluid" />
                      </div>
                      <h3 className='font-bold text-3xl'>Hassle Free Returns</h3>
                      <p>We offer a straightforward return process to ensure your satisfaction. If you encounter any issues with your purchase, our hassle-free return policy makes it easy to get a replacement or refund.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="img-wrap">
                  <img src="wcu.webp" alt="Image" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Why Choose Us Section */}
        
    </div>
  )
}

export default WhyChooseUs
