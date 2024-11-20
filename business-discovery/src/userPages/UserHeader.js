import React from "react";
import '../userPagesStyling/userHeader.scss';
import { FaSearch, FaUserCircle } from "react-icons/fa";

const UserNavBar = () => {
    return(
        <div className="navbar">
            <div className="navbar-name">
                <h1 className="pltform-name">
                    LocalConnect
                </h1>
            </div>


            <ul className="navbar-menu">
                <li><a href="#home">Discover</a></li>
                <li><a href="#home">Categories</a></li>
            </ul>

            <div className="navbar-search">
                <input type="text" 
                placeholder="Search businesses..."  
                className="search-input" />
                <button className="submit-search"> <FaSearch /> </button>
            </div>

            <div className="nav-profile">
                <FaUserCircle className="profile-icon" />

                <div className="profile-dropdown">
                    <a href="#home">My profile</a>
                    <a href="#home">Logout</a>
                </div>
            </div>
        </div>
    );
};

export default UserNavBar;