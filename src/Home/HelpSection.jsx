import React from 'react'

function HelpSection() {
  return (
    <div >
      {/* Start We Help Section */}
      <div className="we-help-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <div className="imgs-grid">
                  <div className="grid grid-1"><img src="engineer-electrician-working-with-industrial-water-pumps-maintenance-service-concept-isometric_255805-449.avif" alt="Untree.co" /></div>
                  <div className="grid grid-2"><img src="water-pump-dynamo-engine-system-isometric-3d-illustration_18660-5582.avif" alt="Untree.co" /></div>
                  <div className="grid grid-3"><img src="symbols.webp" alt="Untree.co" /></div>
                </div>
              </div>
              <div className="col-lg-5 ps-lg-5">
                <h2 className="section-title mb-4 font-bold text-3xl">We Help You to safeguard your Motors</h2>
                <p>At TechnoFarm, our mission is to provide innovative solutions that protect and enhance the performance of your farming equipment. Here’s how we help you achieve optimal motor protection and efficiency:</p>
                <ul className="list-unstyled custom-list my-4">
                  <li className='border-2 rounded p-2 m-2'>Our Real-Time Monitoring Enhance Equipment Longevity</li>
                  <li className='border-2 rounded p-2 m-2'>Advanced Controllers Improve Your Motor Performance</li>
                  <li className='border-2 rounded p-2 m-2'>Ensure Easy Integration with Your Existing Systems</li>
                  <li className='border-2 rounded p-2 m-2'>New Microcontroller Technology Benefit Your Operations</li>
                </ul>
                {/* <p><a herf="#" className="btn  bg-yellow-400">Explore</a></p> */}
              </div>
            </div>
          </div>
        </div>
        {/* End We Help Section */}
        
    </div>
  )
}

export default HelpSection
