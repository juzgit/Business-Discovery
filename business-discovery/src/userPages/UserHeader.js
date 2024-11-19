import React from "react";

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
                <li><a href="#home">Categories</a></li>
            </ul>

            <div className="navbar-search">
                <input type="text" placeholder="Search businesses..."  className="search-button" />
                <button className="submit-search"></button>
            </div>

            <div className="nav-profile">
             (/**Add profile image */)

                <div className="profile-dropdown">
                    <a href="#home">My profile</a>
                    <a href="#home">Settings</a>
                    <a href="#home">Logout</a>
                </div>
            </div>
        </div>
    );
};

export default UserNavBar;