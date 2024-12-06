import React, { useState } from "react";
import '../businessPageStyling/MenuHeader.scss';
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

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
                    <li><Link to="/business-dashboard">Dashboard</Link></li>
                    <li><Link to="/business-promotions">Promotions</Link></li>
                    <li><Link to='/business-reviews'>Reviews</Link></li>
                    <li><Link to="/business-profile">Business Profile</Link></li>
                </ul>
                )}
            </div>
        </div>
    );
};

export default BusinessMenuHeader;