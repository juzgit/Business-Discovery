import React from "react";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/HeroSection.scss';

const UserHeroSection = () => {
    return(
        <div className="heroSection-container">
            <h2 className="heroSection-text">Discover Local Gems Near You</h2>
            <button className="explore-button"> <FaSearch href="#discoverPage" /> </button>
        </div>
    );
};

export default UserHeroSection;