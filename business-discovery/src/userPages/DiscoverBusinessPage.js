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
    const [userFavourites, setUserFavourites] = useState([]);


    //fetch all the business to display them in the discover page
      useEffect(() => {
        const fetchBusinesses = async () => {
            try{
                const response = await fetch('/api/business/all');
                const data = await response.json();
                setBusinesses(data);
                setFilteredBusinesses(data);

                const token = localStorage.getItem('userToken');
                const userResponse = await fetch('/api/users/favourites', {
                    headers: {
                        Authorization : `Bearer ${token}`,
                    }
                });

                const userData = await userResponse.json();
                setUserFavourites(userData.favouriteBusiness || []);

            } catch(error){
                console.error('Error fetching businesses:', error);
                setError('Failed to load businesses. Please try again later.');
            }
        };

        fetchBusinesses();
      }, []);



      //search query
      useEffect(() => {
        //Filter businesses based on search query
        setFilteredBusinesses(
            businesses.filter((business) => 
                business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                business.address.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }, [searchQuery, businesses]);

      //submitting reviews
      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        //get the user token
        const token = localStorage.getItem('userToken');

        //if there is no token, alert the user.
        if(!token){
            setError('You must be logged in to submit a review.');
            setIsSubmitting(false);
            return;
        }

        //posting reviews
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
            //set the loading to false once it has been submitted.
            setIsSubmitting(false);
        }
      };

      //favourite or unfavourite business
      const FavouriteToggle = async (businessId, isFavourited) => {
        const token = localStorage.getItem('userToken');
        if(!token){
            alert('You must be logged in to favourite a business.');
            return;
        }

        //checking if a business has been favourited by the user
        //if true, the method will be set to delete
        //if false the method will be set to post
        const method = isFavourited ? 'DELETE' : 'POST';

        try{
            console.log(`Sending request to ${method} favourite for businessId: ${businessId}`);
            const response = await fetch(`/api/users/favourites/${businessId}`, {
                method,
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });

            if(response.ok){
                const updatedFavourites = isFavourited ? userFavourites.filter(id => id !== businessId) : [...userFavourites, businessId];
                setUserFavourites(updatedFavourites);
            } else {
                const errorData = await response.json();
                alert(errorData.message ||'Failed to update favourite status.');
            }
        } catch(error){
            console.error('Error updating favourite status:', error);
            alert('An error occurred. Please try again.');
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
                        filteredBusinesses.map((business) => {
                            const isFavourited = userFavourites.includes(business._id);
                            return(
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

                                    <button onClick={() => FavouriteToggle(business._id, isFavourited)}
                                        >
                                        {isFavourited ? 'Unfavourite' : 'Favourite'}
                                    </button>
                            </div>
                        );
                    })
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