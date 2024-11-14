import React from 'react';
import '../styling/mystyling.scss';

const HeroSection = () => {
    return(
        <div className='hero'>
            <div>
                <h1 className='my-sass'>
                    <a href='#home' className='hero-link'>Discover local business </a> 
                    around you or <a href='#home' className='hero-link'>set up your business </a><br/>to be found by locals and tourists
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;