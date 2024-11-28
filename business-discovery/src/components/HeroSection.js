import React from 'react';
import '../componentsStyling/HeroSectionStyling.scss';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return(
        <div className='hero'>
            <div>
                <h1 className='hero-text'>
                    <Link to='/user-register' className='hero-link'>Discover local business </Link> 
                    around you or <Link to='/business-register' className='hero-link'>set up your business </Link><br/>to be found by locals and tourists
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;