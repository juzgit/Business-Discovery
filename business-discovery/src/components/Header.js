import React from 'react';
import '../styling/HeaderStyling.scss';

const Header = () => {
    return(
        <div className='main-header'>
            <div className='pltform-name'>
                <h2 className='website-name'><a href='#home'>LocalConnect</a></h2>
            </div>

                <ul className='header-buttons-container'>
                    <li className='header-buttons'><a href='#home'>Log In</a> </li>
                    <li className='header-buttons'><a href='#home'>Get Started </a></li>
                </ul>
        </div>
    );
};

export default Header;