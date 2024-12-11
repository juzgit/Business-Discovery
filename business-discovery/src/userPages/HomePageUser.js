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
    const [isModalOpen, setIsModalOpen] = useState(false); //to manage modal visibility.

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
                setReviews(data); // set the reviews in the state
                setTotalReviews(data.length); // update the total reviews count
            } else {
                console.error('Error fetching reviews:', response.statusText);
            }
        } catch (error){
            console.error('Error fetching reviews:', error);
        }
    }

    const ModalToggle = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen){
            fetchReviews(); //fetch reviews when the modal is opened
        }
    }

    return(
        <div className="userHomePage">
            <UserNavBar />
            <UserHeroSection />

            <div className="dashboard">
                <div className="content">
                    <h1>User Dashboard</h1>

                    <div className="user-overview">
                        <h2>Overview</h2>
                        
                        <div className="metric clickable" onClick={ModalToggle}>
                            <p>Total Reviews Written</p>
                            <h4>{totalReviews}</h4>
                        </div>

                        <div className="metric">
                            <p>Favourite</p>
                            
                        </div>

                        <div className="metric">
                            <p>Promotions Viewed</p>
                            
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
                isOpen={isModalOpen}
                onRequestClose={ModalToggle}
                contentLabel="User Reviews"
                className='modal'
                overlayClassName='modal-overlay'
            >
                <h2>Your Reviews</h2>
                <button onClick={ModalToggle} className="close-btn">X</button>

                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-card">
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

            <Footer />
        </div>
    );
};

export default UserHomePage;

