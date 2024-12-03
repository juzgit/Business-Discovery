import React, { useState, useEffect } from "react";
import UserNavBar from "./UserHeader";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/CategoriesPage.scss';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    
    //Add API here
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('/api/categories');
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch(error){
                setError(error.message);
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


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
                                        <button className="explore-button">View Businesses <FaSearch /> </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                </div>
                <Footer />
        </div>

    );
};

export default CategoriesPage;