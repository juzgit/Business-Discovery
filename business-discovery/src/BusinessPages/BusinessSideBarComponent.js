import React from "react";
import '../businessPageStyling/SideBar.scss';

const BusinessSidebar = () => {
    return(
        <div className="sidebar">
            <ul className="side-links">
                <li><a href="#home">Business Profile</a></li>
                <li><a href="#home">Promotions & Events</a></li>
                <li><a href="#home">Reviews</a></li>
                <li><a href="#home">Dashboard</a></li>
            </ul>
        </div>
    );
};

export default BusinessSidebar;