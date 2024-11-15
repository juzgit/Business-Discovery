import React from 'react';
import '../styling/Footer.scss';

const Footer = () => {
    return(
        <div className='footer'>
            <div className='footer-content'>
                <p>All Rights Reserved &copy; 2024</p>
                <ul className='footer-links'>
                    <li><a href='#Privacy'>Privacy Policy</a></li>
                    <li><a href='#TOS'>Terms of Service</a></li>
                    <li><a href='#Contact'>Contact</a></li>
                </ul>
                <p className='footer-social'>
                    Follow us:
                    <a href='#twitter' target='_blank'>Twitter</a>
                    <a href='#facebook' target='_blank'>Facebook</a>
                    <a href='#instagram' target='_blank'>Instagram</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;