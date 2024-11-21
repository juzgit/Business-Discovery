import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/HeroSection.scss';

const UserHeroSection = () => {
    const [userName, setUserName] = useState({
        name: 'John',
        surname: 'Doe',
    })

    return(
        <div className="heroSection-container">
            <h2 className="heroSection-text">Welcome {userName.name} {userName.surname}, Discover Local Gems Near You</h2>
            <button className="explore-button"> <FaSearch href="#discoverPage" /> </button>
        </div>
    );
};

export default UserHeroSection;