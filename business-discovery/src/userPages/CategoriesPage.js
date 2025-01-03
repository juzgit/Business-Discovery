import React, { useState, useEffect } from "react";
import UserNavBar from "./UserHeader";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/CategoriesPage.scss';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    
    //fetch all the categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            const backendUrl = 'https://business-discovery-backend.onrender.com';

            try{
                const response = await fetch(`${backendUrl}/api/categories`);
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch(error){
                setError(error.message);
                console.error("Error fetching categories:", error);
            } finally{
                //don't show the loading message when the categories have been displayed
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    //fetching all the businesses based on their category
    const fetchBusinesses = async (categoryId) => {
        console.log('Category ID:', categoryId);
        setLoading(true); //start loading

        const backendUrl = 'https://business-discovery-backend.onrender.com';

        try{
            console.log('Fetching businesses for category:', categoryId); 
            const response = await fetch(`${backendUrl}/api/business/by-category/${categoryId}`);
            const businessData = await response.json();
            if(!response.ok){
                if(businessData.length === 0){
                    setError('No businesses found for this category');
                } else {
                    setError(`Error: ${response.status}`);
                }
                throw new Error(`Error: ${response.status}`);
            }
            console.log('Business data:', businessData);
            setBusinesses(businessData);
        } catch(error){
            setError(error.message);
            console.error("Error fetching businesses:", error);
        }finally{
            setLoading(false); //end loading
        }
    };

    const handleViewBusinesses = (categoryId, categoryName) => {
        setSelectedCategory({ id: categoryId, name: categoryName });
        fetchBusinesses(categoryId);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setBusinesses([]);
        setSelectedBusiness(null);
    }

    const viewDetails = (business) => {
        setSelectedBusiness(business);
    };

    const backToList = () => {
        setSelectedBusiness(null);
    };


    return(
        <div>
                <div className="categories-page">

                        <UserNavBar />

                        <h2 className="category-heading">Explore Categories</h2>

                        {error && <p className="error-message">{error}</p>}

                        <div className="categories-list">
                            {loadingCategories ? (
                                <p>Loading categories...</p>
                            ) : (
                                categories.map((category) => (
                                <div key={category._id} className="category-card">
                                    <div className="category-info">
                                        <h3>{category.name}</h3>
                                        <p>{category.description}</p>
                                        <button className="explore-button" onClick={() => {console.log('Category clicked:', category); handleViewBusinesses(category._id, category.name)}} >
                                            View Businesses <FaSearch /> 
                                        </button>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    

                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Business Details"
                            className="modal"
                            overlayClassName="modal-overlay"
                            closeTimeoutMS={200}
                            >

                                {selectedBusiness ? (
                                    <div className="business-details">
                                        <h3>Details for {selectedBusiness.businessName}</h3>
                                        <p><strong>Description:</strong> {selectedBusiness.description} </p>
                                        <p><strong>Address:</strong> {selectedBusiness.address} </p>
                                        <p><strong>Phone:</strong> {selectedBusiness.phone} </p>
                                        <p><strong>Website:</strong> {selectedBusiness.businessWebsite} </p>
                                        <p><strong>Hours:</strong> {selectedBusiness.hours} </p>
                                        <button onClick={backToList} className='back-button'>
                                            Back to Businesses
                                        </button>
                                    </div>
                                ): (
                                    <div className="businesses-list">
                                        <h3>Businesses in {selectedCategory ? selectedCategory.name : ''}:</h3>

                                        
                                        {loading ? (
                                            <p>Loading businesses...</p>
                                        ): businesses.length > 0 ? (
                                            <ul>
                                                {businesses.map((business) => (
                                                    <li key={business._id}>
                                                        <h4>{business.businessName}</h4>
                                                        {/**Add a button here 'view details' */}
                                                        <button className="details-btn" onClick={() => viewDetails(business)}>
                                                            View Details
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No businesses found in this category.</p>
                                        )}
                                </div>
                                )}
                                <button className="close-modal" onClick={closeModal}>Close</button>
                        </Modal>
                </div>
                <Footer className='footer' />
        </div>

    );
};

export default CategoriesPage;