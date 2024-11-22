import React from "react";
import '../businessPageStyling/BusinessHomePage.scss';
import BusinessHeader from "./BusinessHeader";
import BusinessSidebar from "./BusinessSideBarComponent";

const BusinessUserHP = () => {
    return(
        <div className="business-home">
            
            {/**Business Header goes here */}

            <BusinessHeader />


            <div className="dashboard">

                <BusinessSidebar/>
                
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