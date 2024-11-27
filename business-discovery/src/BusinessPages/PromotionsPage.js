import React, { useState } from "react";
import BusinessHeader from "./BusinessHeader";
import BusinessSidebar from "./BusinessMenuHeaderComponent";
import '../businessPageStyling/BusinessPromotions.scss';

const BusinessPromotions = () => {
    const [promotion, setPromotion] = useState({
        title: '',
        description: '',
        type: 'Discount',
        startDate: '',
        endDate: '',
        discount: '',
    });

    const [promotionsList, setPromotionsList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotion((prevPromotion) => ({
            ...prevPromotion,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(promotion);
       if(!promotion.title || !promotion.startDate || !promotion.endDate){
            alert('Please fill in all required fields!');
            return;
        } 

        setPromotionsList( (prevList) => [...prevList, promotion]);
        setPromotion({
            title: '',
            description: '',
            type: 'Discount',
            startDate: '',
            endDate: '',
            discount: '',
        });
    };

    return(
    <div className="page-layout">
            <div className="header-container">
                <BusinessHeader />
            </div>

            <div className="main-content">
                <div className="sidebar-container">
                    <BusinessSidebar />
                </div>

                    <div className="promotionPage-container">
                        <div className="promotionPage">
                            <h1 className="promotion-heading">Manage Promotions</h1>

                            <form className="promotion-form" onSubmit={(e) => e.preventDefault()}>
                                
                                <input
                                type="text"
                                name="title"
                                value={promotion.title}
                                onChange={handleChange}
                                placeholder="Promotion Title"
                                />

                                <textarea
                                name="description"
                                value={promotion.description}
                                onChange={handleChange}
                                placeholder="Description"
                                />

                                <select
                                name="type"
                                value={promotion.type}
                                onChange={handleChange}
                                >
                                    <option value="Discount">Discount</option>
                                </select>

                                <input
                                type="date"
                                name="startDate"
                                value={promotion.startDate}
                                onChange={handleChange} 
                                placeholder="Start Date"   
                                />

                                <input
                                type="date"
                                name="endDate"
                                value={promotion.endDate}
                                onChange={handleChange}
                                placeholder="End Date"
                                />

                                {promotion.type === 'Discount' && (
                                    <input
                                    type="number"
                                    name="discount"
                                    value={promotion.discount}
                                    onChange={handleChange}
                                    placeholder="Discount Percentage"
                                    />
                                )}

                                <button type="button" onClick={handleSubmit} className="btn-submit">Create Promotion</button>
                            </form>
                        </div>

                        <div className="active-promotions">
                            <h2 className="active-promotions">Active Promotions</h2>
                            <ul className="promotions-list">
                                {/** Active promotions added here */}

                                {promotionsList.length === 0 ? (
                                    <p>No active promotions available.</p>
                                ) :  (
                                    promotionsList.map((promo, index) => (
                                        <li key={index} className="promotion-item">
                                            <h3>{promo.title}</h3>
                                            <p>{promo.description}</p>
                                            <p>Type: {promo.type} </p>
                                            <p>Discount: {promo.discount ? `${promo.discount}%` : "N/A"}</p>
                                            <p>Start Date: {promo.startDate || "N/A"} </p>
                                            <p>End Date: {promo.endDate || "N/A"} </p>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                    </div>

                    
            </div>
    </div>
    );
};

export default BusinessPromotions;