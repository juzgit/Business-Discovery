import React, { useState, useEffect } from 'react';
import BusinessHeader from './BusinessHeader';
import '../businessPageStyling/BusinessReviews.scss';
import Footer from '../components/Footer';

const BusinessReviews = () => {

    const businessId  = localStorage.getItem("businessId");
    console.log('Business ID:', businessId)

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if(!businessId){
                setError('Business ID is missing.');
                setLoading(false);
                return;
            }

            //fetching reviews related to a specific business
            try{
                const response = await fetch(`/api/reviews?businessId=${businessId}`, {
                    method: 'GET',
                    headers: {
                        //validate the business user.
                        "Authorization": `Bearer ${localStorage.getItem("businessToken")}`
                    }
                });
                if(!response.ok){
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
                setError(null);
            } catch(error){
                console.error('Error fetching reviews:', error);
                setError('Could not fetch reviews.');
            } finally{
                setLoading(false);
            }
        };

        fetchReviews();
    }, [businessId]);
    
    return(
        <div className='page-layout'>

            <div className='header-container'>
                <BusinessHeader />
            </div>

            <div className='main-content'>

                    <div className='reviews-page'>
                        <h1 className='reviews-page-heading'>Customer Reviews</h1>

                        {loading && <p>Loading reviews...</p>}
                        {error && <p>{error}</p>}

                        <h2 className='reviews-list-heading'>Reviews</h2>

                        {!loading && !error && reviews.length > 0 ? (
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
                        ) : (
                            !loading && <p>No reviews available for this business.</p>
                        )}
                    </div>
            </div>

        <Footer />
        </div>

    );
};

export default BusinessReviews;