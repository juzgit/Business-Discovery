import React, { useState, useEffect } from "react";
import UserNavBar from "./UserHeader";
import { FaSearch } from "react-icons/fa";
import '../userPagesStyling/CategoriesPage.scss';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    
    //Add API here

    const mockCategories = [
        { id: 1, name: 'Cafes', description: 'Find the best coffee shops around you.'},
        { id: 2, name: 'Gyms', description: 'Get fit at local gyms and fitness centers.'},
        { id: 3, name: 'Restaurants', description: 'Explore the top dining spots in town.'},
        { id: 4, name: 'Bookstores', description: 'Discover your next read at nearby bookstores.'},
      ];

      useEffect(() => {
        setCategories(mockCategories);
      }, []);


    return(
        <div className="categories-page">

            <UserNavBar />
            
            <h2 className="category-heading">Explore Categories</h2>

            <div className="categories-list">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                    <div className="category-info">
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                        <button className="explore-button">View Businesses <FaSearch /> </button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;