import React from "react";

const BusinessUserHP = () => {
    return(
        <div className="business-home">
            
            <div className="header">
                <div className="business-name-header">
                    <h2 className="business-name">Business Name</h2>
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
                        <li><a href="#home">Reviews & Analytics</a></li>
                        <li><a href="#home">Dashboard</a></li>
                    </ul>
                </div>

                <div className="main-content">
                    <h1 className="user-dashboard">Welcome to Your Dashboard</h1>

                    <div className="metrics">
                        <div className="metric">
                            <h3 className="promotions-heading">Active Promotions</h3>
                        </div>

                        <div className="metric">
                            <h3 className="rating-heading">Average Rating</h3>
                            <p>(/**Display average rating over here */)</p>
                        </div>

                        <div className="metric">
                            <h3 className="recent-rev-heading">Recent Reviews</h3>
                            <p>(/**Display new ratings */) views</p>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="action-btn">
                            (/**Link to the Promotion Page */)
                        </button>

                        <button className="action-btn">
                            (/**Link to the Profile Page */)
                        </button>

                        <button className="action-btn">
                            (/**Link to the Reviews page */)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessUserHP;