import React from "react";
import '../businessPageStyling/BusinessHomePage.scss';
import BusinessHeader from "./BusinessHeader";
import BusinessSidebar from "./BusinessSideBarComponent";

const BusinessUserHP = () => {

    const mockAverageRating = 4.3;
    const mockPromotions = ["50% off Membership", "Buy 1 Get 1 Free", "Holiday Special Discounts"];
    const mockReviews = [
        { user: "Alice", review: "Great service and friendly staff!", rating: 5 },
        { user: "Bob", review: "Clean environment, but can improve on wait times.", rating: 4 },
        { user: "Cathy", review: "Affordable and well-maintained facilities.", rating: 4.5 },
    ]

    return(
        <div className="business-home">
            
            <div className="business-header">
                <BusinessHeader />
            </div>

            <div className="dashboard-container">
                <div className="heading-container">
                    <h1 className="dashboard-heading">Welcome to Your Dashboard</h1>
                </div>
                
                <div className="dashboard">

                    <div className="sidebar">
                        <BusinessSidebar/>
                    </div>
            
                    <div className="main-content">
                    
                        <div className="metrics">
                            <div className="metric">
                                <h3 className="promotions-heading">Active Promotions</h3>
                                {/**Display active promotions here */}
                                <ul>
                                    {mockPromotions.map((promotion, index) => (
                                        <li key={index}>{promotion}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="metric">
                                <h3 className="rating-heading">Average Rating</h3>
                                <p>{mockAverageRating} / 5</p>
                            </div>

                            <div className="metric">
                                <h3 className="recent-rev-heading">Recent Reviews</h3>
                                <ul>
                                    {mockReviews.map((review, index) => (
                                        <li key={index}>
                                            <strong>{review.user}:</strong> {review.review} <em>({review.rating} / 5 )</em>
                                        </li>
                                    ))}
                                </ul>
                                <button className="reviews-button">View All Reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessUserHP;