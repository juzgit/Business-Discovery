import React, { useState } from "react";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    
    //Add API here
    return(
        <div className="categories-page">
            
            <h2 className="category-heading">Explore Categories</h2>

            <div className="categories-list">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                    <div className="category-info">
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                        <button className="explore-button">View Business</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;