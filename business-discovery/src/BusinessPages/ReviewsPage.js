import React, { useState, useEffect } from 'react';
import BusinessHeader from './BusinessHeader';
import '../businessPageStyling/BusinessReviews.scss';
import Footer from '../components/Footer';

const BusinessReviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const response = await fetch('/api/reviews');
                if(!response.ok){
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch(error){
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);
    
    return(
        <div className='page-layout'>

            <div className='header-container'>
                <BusinessHeader />
            </div>

            <div className='main-content'>

                    <div className='reviews-page'>
                        <h1 className='reviews-page-heading'>Customer Reviews</h1>

                        <h2 className='reviews-list-heading'>Reviews</h2>

                        <ul className='reviews-list'>
                            {/**Display reviews here */}
                            {reviews.map((review) => (
                                <li key={review._id} className='review-item'>
                                    <h3 className='reviewer-name'>{review.name}</h3>
                                    <p className='review-rating'>Rating: {review.rating}</p>
                                    <p className='review-comment'>"{review.comment}"</p>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>

        <Footer />
        </div>

    );
};

export default BusinessReviews;