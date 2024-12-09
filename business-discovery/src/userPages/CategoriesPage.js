import React, { useState, useEffect } from "react";
import UserNavBar from "./UserHeader";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/CategoriesPage.scss';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    //fetch all the categories
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('/api/categories');
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch(error){
                setError(error.message);
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    //fetching all the businesses based on their category
    const fetchBusinesses = async (categoryId) => {
        console.log('Category ID:', categoryId);
        setLoading(true); //start loading
        try{
            console.log('Fetching businesses for category:', categoryId); 
            const response = await fetch(`/api/business/by-category/${categoryId}`);
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

    const handleViewBusinesses = (categoryId) => {
        setSelectedCategory(categoryId);
        fetchBusinesses(categoryId);
    }


    return(
        <div>
                <div className="categories-page">

                        <UserNavBar />

                        <h2 className="category-heading">Explore Categories</h2>

                        {error ? (
                            <p className='error-message'>{error}</p>
                        ) : (
                        <div className="categories-list">
                            {categories.map((category) => (
                                <div key={category._id} className="category-card">
                                    <div className="category-info">
                                        <h3>{category.name}</h3>
                                        <p>{category.description}</p>
                                        <button className="explore-button" onClick={() => handleViewBusinesses(category._id)}>
                                            View Businesses <FaSearch /> 
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}

                        {selectedCategory && (
                            <div className="businesses-list">
                                <h3>Business in this category:</h3>

                                
                                {loading ? (
                                    <p>Loading businesses...</p>
                                ): businesses.length > 0 ? (
                                    <ul>
                                        {businesses.map((business) => (
                                            <li key={business._id}>
                                                <h4>{business.businessName}</h4>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No businesses found in this category.</p>
                                )}
                            </div>
                        )}
                </div>
                <Footer />
        </div>

    );
};

export default CategoriesPage;