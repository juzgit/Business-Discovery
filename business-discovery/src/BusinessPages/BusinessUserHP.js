import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../businessPageStyling/BusinessHomePage.scss';
import BusinessHeader from "./BusinessHeader";
import Footer from "../components/Footer";

const BusinessUserHP = () => {

    const [promotions, setPromotions] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchPromotions = async () => {

            const backendUrl = 'https://business-discovery-backend.onrender.com';

            try{
                const token = localStorage.getItem('businessToken');
                const response = await fetch(`${backendUrl}/api/promotions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const promotionsData = await response.json();
                setPromotions(promotionsData);
            } catch(error){
                console.error('Error fetching promotions:', error);
            }
        };

        const fetchReviews = async () => {

            const backendUrl = 'https://business-discovery-backend.onrender.com';

            try{
                const token = localStorage.getItem('businessToken');
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const reviewData = await response.json();
                setReviews(reviewData);

                //calculating average rating
                const totalRatings = reviewData.reduce((sum, review) => sum + review.rating, 0);
                const average = (totalRatings / reviewData.length).toFixed(1);
                setAverageRating(average);
            } catch(error){
                console.error('Error fetching reviews:', error);
            }
        };

        fetchPromotions();
        fetchReviews();
    }, []);


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
            
                    <div className="main-content">
                    
                        <div className="metrics">
                            <div className="metric">
                                <h3 className="promotions-heading">Active Promotions</h3>
                                {/**Display active promotions here */}
                                <ul>
                                    {promotions.length > 0 ? (
                                    promotions.map((promotion) => (
                                        <li key={promotion._id || promotion.title}>
                                          <h4>{promotion.title}</h4>
                                          <p>{promotion.description}</p>
                                          <p> Type: {promotion.type}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p>No promotions available</p>
                                )}
                                </ul>
                                <button className="button-group"><Link to='/business-promotions'>View All Promotions</Link></button>
                            </div>

                            <div className="metric">
                                <h3 className="rating-heading">Average Rating</h3>
                                <p>{averageRating || "N/A"} / 5</p>
                            </div>

                            <div className="metric">
                                <h3 className="recent-rev-heading">Recent Reviews</h3>
                                <ul>
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <li key={review._id}>
                                                <strong>{review.name}:</strong> {review.comment}
                                                <em>({review.rating} / 5)</em>
                                            </li>
                                        ))
                                    ): (
                                        <p>No reviews available</p>
                                    )}
                                </ul>
                                <button className="button-group"><Link to='/business-reviews'>View All Reviews</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           <Footer />                             
        </div>
    );
};

export default BusinessUserHP;