import React from 'react';
import '../styling/HeroSectionStyling.scss';

const HeroSection = () => {
    return(
        <div className='hero'>
            <div>
                <h1 className='hero-text'>
                    <a href='#home' className='hero-link'>Discover local business </a> 
                    around you or <a href='#home' className='hero-link'>set up your business </a><br/>to be found by locals and tourists
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;