import React from 'react'

function PopularProducts() {
  return (
    <div className='bg-zinc-100'>
         {/* Start Popular Product */}
         <hr />
         <div className="popular-product mt-5 ">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img src="munsi_1.jpg" alt="Image" className="img-fluid" />
                  </div>
                  <div className="pt-3">
                    <h3 className="font-bold text-3xl">MUNSI OPERATOR</h3>
                    <p>SINGLE PHASE PREVENTOR, AUTOMATIC OPERATOR</p>
                    <p className='btn  mt-3 bg-yellow-400'><a href={`/product/3`}>Read More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img src="panel_2.jpg" alt="Image" className="img-fluid" />
                  </div>
                  <div className="pt-3">
                    <h3>SUBMERSIBLE PANEL</h3>
                    <p>Digital panel</p>
                    <p className='btn  mt-12 bg-yellow-400'><a href={`/product/6`}>Read More</a></p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img src="meter_3.jpg" alt="Image" className="img-fluid" />
                  </div>
                  <div className="pt-3">
                    <h3>DIGITAL METER</h3>
                    <p>Volt and Ampere meter</p>
                    <p className='btn  mt-12 bg-yellow-400'><a href={`/product/5`}>Read More</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Popular Product */}
       
      
    </div>
  )
}

export default PopularProducts
