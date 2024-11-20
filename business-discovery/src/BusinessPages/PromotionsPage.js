import React, { useState } from "react";

const Promotions = () => {
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

    const handleSubmit = (e) => {
        setPromotionsList([...promotionsList, promotion]);
        setPromotion({
            title: '',
            description: '',
            type: 'Discount',
            startDate: '',
            endDate: '',
            discount: ''
        });
    };

    return(
        <div className="promotionPage">
            <h1 className="promotion-heading">Manage Promotions</h1>

            <form className="promotion-form">
                
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
                name="endDate"
                value={promotion.endDate}
                onChange={handleChange}
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

            <h2 className="active-promotions">Active Promotions</h2>
            <ul className="promotions-list">
                (/** Active promotions added here */)
            </ul>
        </div>
    );
};

export default Promotions;