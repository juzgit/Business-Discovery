import React from 'react';
import '../styling/AboutSection.scss';

const AboutSection = () =>{
    const websiteName = "LocalConnect";
    const categories = ["restaurants", "shops", "services"];

    return(
        <div className='about-section'>
            <h2 className='about-heading'>What is {websiteName}? </h2>

            <p className='about-text' >
                {websiteName} is a platform that connects you to the best local business. Whether you are a resident or a visitor, discover the best {categories.join(", ")}, all in one place.
            </p>

            <p className='about-text'>
                Our mission is to support local communities by helping small businesses thrive. We aim to make it easy for you to find hidden gems, read reviews, and access exclusive deals.
            </p>

            <p className='about-text'>
                From cozy neighborhood cafes to skilled service providers, {websiteName} helps you explore your community and make informed choices. Enjoy personalised recommendations and stay-up-to-date with the latest events and promotions in your area.
            </p>

            <p className='about-text'>
                Join us in building a vibrant local economy by supporting the businesses that make your community unique!
            </p>
        </div>
    );
};

export default AboutSection;