import React from 'react'
function ProductionSection() {
  return (
    <div >
      {/* Start Product Section */}
      <div className="product-section">
          <div className="container">
            <div className="row">
              {/* Start Column 1 */}
              <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                <h2 className="mb-4 section-title text-3xl font-bold">Unleashing the Microcontroller Technology.</h2>
                <p className="mb-4">Precision Control and Automation: Our advanced microcontroller systems are engineered to deliver unparalleled precision in controlling and automating tube well motors. This ensures optimal performance, reduces operational downtime, and enhances overall reliability. </p>
                <p><a href="shop.html" className="btn bg-yellow-400     ">Explore</a></p>
              </div> 
              {/* End Column 1 */}
              {/* Start Column 2 */}
              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="product/3">
                  <img src="bada_1.jpg" className="img-fluid product-thumbnail" />
                  <h3 className="product-title">BADA OPERATOR</h3>
                  <strong className="product-price">₹1100</strong>
                  <span className="icon-cross">
                    <img src="bada_1.jpg" className="img-fluid" />
                  </span>
                </a>
              </div> 
              {/* End Column 2 */}
              {/* Start Column 3 */}
              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="/product/5">
                  <img src="meter_1.jpg" className="img-fluid product-thumbnail" />
                  <h3 className="product-title">DIGITAL METER</h3>
                  <strong className="product-price">₹400</strong>
                  <span className="icon-cross">
                    <img src="meter_1.jpg" className="img-fluid" />
                  </span>
                </a>
              </div>
              {/* End Column 3 */}
              {/* Start Column 4 */}
              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="product/4">
                  <img src="mobile_1.jpg" className="img-fluid product-thumbnail" />
                  <h3 className="product-title">MOBILE OPERATOR</h3>
                  <strong className="product-price">₹2200</strong>
                  <span className="icon-cross">
                    <img src="mobile_1.jpg" className="img-fluid" />
                  </span>
                </a>
              </div>
              {/* End Column 4 */}
            </div>
          </div>
        </div>
        {/* End Product Section */}
        
    </div>
  )
}

export default ProductionSection
