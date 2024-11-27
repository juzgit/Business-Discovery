import React, { useState } from 'react';
import BusinessHeader from './BusinessHeader';
import BusinessSidebar from './BusinessMenuHeaderComponent';
import '../businessPageStyling/BusinessReviews.scss';

const BusinessReviews = () => {

    const [reviews] = useState([
        {
            id: 1,
            name: 'John Doe',
            rating: 5,
            comment: 'Excellent service! Highly recommend.'
        },

        {
            id:2,
            name: 'Jane Smith',
            rating: 4,
            comment: 'Great experience, but the wait time was a bit long.'
        },

        {
            id: 3,
            name: 'Bob Johnson',
            rating: 3,
            comment: 'Average service, nothing special.',
        }
    ]);
    
    return(
        <div className='page-layout'>

            <div className='header-container'>
                <BusinessHeader />
            </div>

            <div className='main-content'>

                    <div className='sidebar-container'>
                        <BusinessSidebar />
                    </div>

                    <div className='reviews-page'>
                        <h1 className='reviews-page-heading'>Customer Reviews</h1>

                        <h2 className='reviews-list-heading'>Reviews</h2>

                        <ul className='reviews-list'>
                            {/**Display reviews here */}
                            {reviews.map((review) => (
                                <li key={review.id} className='review-item'>
                                    <h3 className='reviewer-name'>{review.name}</h3>
                                    <p className='review-rating'>Rating: {review.rating}</p>
                                    <p className='review-comment'>"{review.comment}"</p>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>


        </div>

    );
};

export default BusinessReviews;