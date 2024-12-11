import React, { useEffect, useState } from 'react';
import UserNavBar from './UserHeader';
import Footer from '../components/Footer';
import '../userPagesStyling/UserDiscoverBusiness.scss';
import { FaSearch } from 'react-icons/fa';

const UserDiscoverBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [reviewForm, setReviewForm] = useState(false);
    const [chosenBusinessId, setChosenBusinessId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [review, setReview] = useState({
        name: '',
        rating: 0,
        comment: '',
    });

    const [error, setError] = useState('');


      useEffect(() => {
        const fetchBusinesses = async () => {
            try{
                const response = await fetch('/api/business/all');
                const data = await response.json();
                setBusinesses(data);
                setFilteredBusinesses(data);
            } catch(error){
                console.error('Error fetching businesses:', error);
                setError('Failed to load businesses. Please try again later.');
            }
        };

        fetchBusinesses();
      }, []);



      useEffect(() => {
        //Filter businesses based on search query
        setFilteredBusinesses(
            businesses.filter((business) => 
                business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }, [searchQuery, businesses]);

      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const token = localStorage.getItem('userToken');

        if(!token){
            setError('You must be logged in to submit a review.');
            setIsSubmitting(false);
            return;
        }

        try{
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...review, businessId: chosenBusinessId }),
            });

            if(response.ok){
                alert('Review submitted successfully');
                setReview({ name: '', rating: 0, comment: '' }); // reset it to default
                setReviewForm(false);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to submit the review.');
            }
        } catch(error){
            console.error('Error submitting review:', error);
            setError('An error occurred. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
      };


    return(
        <div>
            
            <div className='discover-page'>

                <UserNavBar />
                
                <div className='discover-header'>
                    <h2 className='discover-heading'>Discover Local Businesses</h2>
                    <input 
                    type='text'
                    placeholder='Search for businesses...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className='search-btn'> <FaSearch /> </button>
                </div>

                <div className='business-list'>
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map((business) => (
                            <div key={business._id} className='business-card'>
                                <h3>{business.businessName}</h3>
                                <p>{business.businessType}</p>
                                <p>{business.address}</p>
                                <button onClick={() => {
                                    setReviewForm(true);
                                    setChosenBusinessId(business._id);
                                }}>
                                    Leave a Review
                                    </button>
                            </div>
                        ))
                    ) : (
                        <p>No businesses found</p>
                    )}
                </div>

                {reviewForm && (
                <div className="review-form-layout">
                    <div className="review-form">
                        <h3>Leave a Review</h3>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleReviewSubmit}>
                            <input 
                            type='text'
                            placeholder='Your Name'
                            value={review.name}
                            onChange={(e) => setReview({ ...review, name: e.target.value })}
                            required
                            />

                            <input
                            type='number'
                            placeholder='Rating (1-5)'
                            value={review.rating}
                            onChange={(e) => setReview({...review, rating: e.target.value })}
                            min="1"
                            max="5"
                            required
                            />

                            <textarea
                            placeholder='Your comment'
                            value={review.comment}
                            onChange={(e) => setReview({ ...review, comment: e.target.value })
                            }
                            required
                            ></textarea>
                            <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...': 'Submit'}</button>
                            
                            <button
                            type='button'
                            onClick={() => setReviewForm(false)}
                            >Cancel
                            </button>
                        </form>
                    </div> 
                </div>
            )}
            </div>

        <Footer />
        </div>
    );
};

export default UserDiscoverBusiness;