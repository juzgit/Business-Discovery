import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../userPagesStyling/userHeader.scss';
import { FaUserCircle } from "react-icons/fa";

const UserNavBar = () => {

    const navigate = useNavigate();

    const Logout = async () =>{
        try{
            localStorage.removeItem('userToken');
            navigate('/');
        } catch(error){
            console.error('Error logging out:', error);
        }
    };


    return(
        <div className="navbar">
            <div className="navbar-name">
                <h1 className="pltform-name">
                  <Link to="/user-homepage">LocalConnect</Link>
                </h1>
            </div>


            <ul className="navbar-menu">
                <li><Link to="/user-discover">Discover</Link></li>
                <li><Link to="/user-categories">Categories</Link></li>
            </ul>

            <div className="nav-profile">
                <FaUserCircle className="profile-icon" />

                <div className="profile-dropdown">
                    <button><Link to="/user-profile">My profile</Link></button>
                    <button onClick={Logout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserNavBar;