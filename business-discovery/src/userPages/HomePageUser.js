import React, { useState, useEffect } from "react";
import '../userPagesStyling/HomePage.scss';
import UserNavBar from "./UserHeader";
import UserHeroSection from "./UserHeroSection";
import Footer from "../components/Footer";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UserHomePage = () => {

    const [reviews, setReviews] = useState([]); //store reviews data.
    const [totalReviews, setTotalReviews] = useState(0); //store total reviews.
    const [favourites, setFavourites] = useState([]);
    const [totalFavourites, setTotalFavourites] = useState(0);
    const [isReviewModalOpen, setReviewIsModalOpen] = useState(false); //to review manage modal visibility.
    const [isFavouriteModalOpen, setFavouriteIsModalOpen] = useState(false); //to manage favourite modal visibility.
    const [favouritesLoading, setFavouritesLoading] = useState(true);

    const fetchUserMetrics = async () => {
        try{
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/metrics', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if(response.ok){
                const data = await response.json();
                setTotalReviews(data.totalReviews); //update reviews count
                setTotalFavourites(data.totalFavourites); //update favourites count
            }
        } catch(error){
            console.error('Error fetching user metrics:', error);
        }
    };

    useEffect(() => {
        fetchUserMetrics();
    }, []);

    const fetchReviews = async () => {
        try{
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/reviews/my-reviews', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if(response.ok){
                const data = await response.json();
                console.log('Fetched favourites data:', data);
                setReviews(data); // set the reviews in the state
                setTotalReviews(data.length); // update the total reviews count
            } else {
                console.error('Error fetching reviews:', response.statusText);
            }
        } catch (error){
            console.error('Error fetching reviews:', error);
        }
    }

    //Review modal
    const ReviewModalToggle = () => {
        setReviewIsModalOpen(!isReviewModalOpen);
        if (!isReviewModalOpen){
            fetchReviews(); //fetch and display reviews when the modal is opened.
        }
    };

    //fetch the businesses that were favourited by the user.
    const fetchFavourites = async () => {
        console.log('Fetching favourites...');
        try{
            setFavouritesLoading(true);
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/favourites', {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.ok){
                const data = await response.json();
                console.log('API Response:', data);
                //console.log('Fetched favourites data:', data);

                const favouritesList = data.favouriteBusiness || [];
                setFavourites(favouritesList);
                setTotalFavourites(favouritesList.length || 0);
            }else {
                console.error('Error fetching favourites:', response.statusText);
            }
        } catch(error){
            console.error('Error fetching favourites:', error);
            setFavourites([]);
            setTotalFavourites(0);
        } finally {
            console.log('Setting favouritesLoading to false.');
            setFavouritesLoading(false);
        }
    }

    useEffect(() => {
        fetchFavourites();
    }, []);

    const FavouriteModalToggle = () => {
        setFavouriteIsModalOpen(!isFavouriteModalOpen);
        if (!isFavouriteModalOpen){
            fetchFavourites(); //fetch and display favourites when the modal is opened.
        }
    };

    const unfavouriteBusiness = async (businessId) => {
        console.log('Unfavouriting business with ID:', businessId);
        try{
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/users/favourites/${businessId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data =  await response.json();
            console.log('Response from server:', data);

            if(response.ok){
                //remove the business from favourites list
                const updatedFavourites = favourites.filter(fav => fav._id !== businessId);
                setFavourites(updatedFavourites); //update  the favourites state.
                setTotalFavourites(updatedFavourites.length); //update the total favourites.
                console.log('Updated favourites:', updatedFavourites);
            } else {
                console.error('Error unfavouriting business:', response.statusText);
            }
        } catch(error){
            console.error('Error unfavouriting business:', error);
        } finally {
            setFavouritesLoading(false);
        }
    };

    return(
        <div className="userHomePage">
            <UserNavBar />
            <UserHeroSection />

            <div className="dashboard">
                <div className="content">
                    <h1>User Dashboard</h1>

                    <div className="user-overview">
                        <h2>Overview</h2>
                        
                        <div className="metric clickable" onClick={ReviewModalToggle}>
                            <p>Total Reviews Written</p>
                            <h4>{totalReviews}</h4>
                        </div>

                        <div className="metric clickable" onClick={FavouriteModalToggle}>
                            <p>Favourite</p>
                            <h4>{favouritesLoading ? 'Loading...' : totalFavourites}</h4>
                        </div>

                    </div>

                    <div className="recommended-business">
                        <h2>Recommended for You</h2>
                        <ul>
                            <li>
                                <a href="#home">Business A</a> - A you business you might like
                            </li>

                            <li>
                                <a href="#home">Business B</a> - A you business you might like
                            </li>

                            <li>
                                <a href="#home">Business C</a> - A you business you might like
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isReviewModalOpen}
                onRequestClose={ReviewModalToggle}
                contentLabel="User Reviews"
                className='modal'
                overlayClassName='modal-overlay'
            >
                <h2>Your Reviews</h2>
                <button onClick={ReviewModalToggle} className="close-btn">X</button>

                <div className="modal-list">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="modal-card">
                                <h4>{review.businessId.businessName}</h4>
                                <p>Rating: {review.rating}/5</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </div>
            </Modal>

            <Modal
                isOpen={isFavouriteModalOpen}
                onRequestClose={FavouriteModalToggle}
                className='modal'
                overlayClassName='modal-overlay'
            >
                <h2>Your Favourited Businesses</h2>

                <button onClick={FavouriteModalToggle} className='close-btn'>X</button>

                <div className="modal-list">
                    {favourites.length > 0 ? (
                        favourites.map((favourite, index) => (
                            <div key={index} className="modal-card">
                                <h4>{favourite.businessName}</h4>
                                <button onClick={() => unfavouriteBusiness(favourite._id)} className="unfavourite-btn">
                                    Unfavourite
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No favourites found.</p>
                    )}
                </div>
            </Modal>

            <Footer />
        </div>
    );
};

export default UserHomePage;

