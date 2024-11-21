import React from "react";
import '../businessPageStyling/BusinessHomePage.scss';
import { FaEdit, FaUpload, FaInfo } from "react-icons/fa";

const BusinessUserHP = () => {
    return(
        <div className="business-home">
            
            <div className="header">
                <div className="business-name-header">
                    <h2 className="business-name">LocalConnect</h2>
                </div>

                <div className="actions">
                    <button className="action-btn">
                        <a href="#home">Create New Promotion <FaUpload/> </a> {/**Takes you the promotions page */}
                    </button>

                    <button className="action-btn">
                        <a href="#home">Edit Profile <FaEdit/> </a> {/**Takes you to Edit Profile page */}
                    </button>

                    <button className="action-btn">
                        <a href="#home">Read Reviews <FaInfo /> </a> {/**Takes you to the Reviews Page */}
                    </button>
                </div>

                <div className="user-profile">
                    <button className="log-out-btn">Logout</button>
                </div>
            </div>

            <div className="dashboard">
                <div className="sidebar">
                    <ul className="side-links">
                        <li><a href="#home">Business Profile</a></li>
                        <li><a href="#home">Promotions & Events</a></li>
                        <li><a href="#home">Reviews</a></li>
                        <li><a href="#home">Dashboard</a></li>
                    </ul>
                </div>

                <h1 className="user-dashboard">Welcome to Your Dashboard</h1>

                <div className="main-content">
                    
                    <div className="metrics">
                        <div className="metric">
                            <h3 className="promotions-heading">Active Promotions</h3>
                            {/**Display active promotions here */}
                        </div>

                        <div className="metric">
                            <h3 className="rating-heading">Average Rating</h3>
                            <p>{/**Display average rating over here */}</p>
                        </div>

                        <div className="metric">
                            <h3 className="recent-rev-heading">Recent Reviews</h3>
                            <p>{/**Display a few reviews, maybe 3 reviews */} Reviews</p>
                            {/**Add a button that takes you to the reviews page  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessUserHP;