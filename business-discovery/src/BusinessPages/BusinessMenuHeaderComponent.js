import React, { useState } from "react";
import '../businessPageStyling/MenuHeader.scss';
import { FaBars } from "react-icons/fa";

const BusinessMenuHeader = () => {
    const [menuHeader, setMenuHeader] = useState(false);

    const toggleMenu = () => {
        setMenuHeader(!menuHeader);
    }

    return(
        <div className="menu-header">
            <div className="menu-container">
                <div className="menu-icon" onClick={toggleMenu}>
                    <FaBars />
                </div>

                {menuHeader && (
                <ul className= 'menu-links'>
                    <li><a href="#home">Dashboard</a></li>
                    <li><a href="#home">Promotions & Events</a></li>
                    <li><a href="#home">Reviews</a></li>
                    <li><a href="#home">Business Profile</a></li>
                </ul>
                )}
            </div>
        </div>
    );
};

export default BusinessMenuHeader;