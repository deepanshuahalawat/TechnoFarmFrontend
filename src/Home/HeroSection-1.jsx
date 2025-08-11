import React from 'react'

function HeroSection() {
    const imageUrl = 'benner_2.jpg'; // Replace with your image path

    const style = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Full viewport height
        width: '100vw'   // Full viewport width
    };
    return (
        <div>
            <div className="hero" style={style}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">

                                <h2 className='text-5xl text-yellow-400 font-bold'>Looking  </h2>
                                <h2 className='text-5xl text-black font-bold'> for Advanced Motor Protection Solutions?</h2>
                                <p className="mb-4 my-5 text-black">Highlight your focus on safeguarding agricultural machinery with state-of-the-art technology.</p>
                                {/* <p><a href="/shop" className="btn btn-secondary me-2 font-bold">Shop Now</a><a href="/shop" className="btn btn-black-outline">Explore</a></p> */}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                                <img src="bigLogo.png" alt="Hero" className="w-full h-auto rounded-lg " />
                            </div>
                       
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection
