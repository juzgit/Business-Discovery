import React from 'react';
import { Link } from 'react-router-dom';
import '../componentsStyling/HeaderStyling.scss';

const Header = () => {
    return(
        <div className='main-header'>
            <div className='pltform-name'>
                <h2 className='website-name'><Link to='/'>LocalConnect</Link></h2>
            </div>

                <ul className='header-buttons-container'>
                    <li className='header-buttons'><Link to='/user-login'>Log In</Link> </li>
                    <li className='header-buttons'><Link to='/user-register'>Get Started </Link></li>
                </ul>
        </div>
    );
};

export default Header;