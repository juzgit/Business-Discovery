import React, { useState, useEffect } from "react";
import BusinessHeader from "./BusinessHeader";
import '../businessPageStyling/BusinessPromotions.scss';
import Footer from "../components/Footer";

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
    //  manages whether the component is currently in edit mode.
    const [editPromotion, setEditPromotion] = useState(false);
    //Tracks which index is being edited
    const [editIndex, setEditIndex] = useState(null);

    //format the date to yyyy-MM-dd
    const formatDate = (date) => {
        if(!date) return ""; //is the date empty or null, return an empty string
        const d = new Date(date);
        if (isNaN(d.getTime())) return ""; //is the date valid
        
        return d.toISOString().slice(0, 16);
    };

    //fetching all the promotions
    useEffect(() => {
        const fetchPromotions = async () => {
            try{

                const token = localStorage.getItem('businessToken');
                console.log('Token received?', token);

                if(!token){
                    throw new Error('No token found. Please log in again.');
                }
                console.log('Fetching promotions...');
                const response = await fetch('/api/promotions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('API Response:', response);
                if(!response.ok) {
                    throw new Error('Failed to fetch promotions');
                }
                const data = await response.json();
                console.log('Promotion Data:', data);
                setPromotionsList(data);
            } catch(error){
                console.error("Error fetching promotions:", error);
            }
        };
        fetchPromotions();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotion((prevPromotion) => ({
            ...prevPromotion,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
       if(!promotion.title || !promotion.startDate || !promotion.endDate){
            alert('Please fill in all required fields!');
            return;
        } 

        try{
            const token = localStorage.getItem('businessToken');
            if(!token){
                throw new Error('No token found. Please log in again.');
            }
            if(editPromotion){
                const response = await fetch(`/api/promotions/${promotionsList[editIndex]._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(promotion),
                    }
                );

                if(!response.ok){
                    throw new Error("Failed to update the promotion");
                }
                const updatedPromotion = await response.json();

                const updatedPromotions = [...promotionsList];
                updatedPromotions[editIndex] = updatedPromotion;
                setPromotionsList(updatedPromotions);
                setEditPromotion(false);
                setEditIndex(null);
            } else {
                const response = await fetch('/api/promotions', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(promotion),
                });
                if(!response.ok){
                    throw new Error("Failed to create the promotion");
                }

                const newPromotion = await response.json();

                setPromotionsList([...promotionsList, newPromotion]);
            }

                // reset the inputs into default values, which is empty.
            setPromotion({
                title: '',
                description: '',
                type: 'Discount',
                startDate: '',
                endDate: '',
                discount: '',
            });
        } catch(error){
            console.error("Error submitting promotion:", error);
        }
    };

    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem('businessToken');
            if(!token){
                throw new Error('No token found. Please log in again.');
            }
            const response = await fetch(`/api/promotions/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if(!response.ok){
                throw new Error('Failed to delete the promotion');
            }

            setPromotionsList(promotionsList.filter((promo) => promo._id !== id));
        } catch(error){
            console.error("Error deleting promotion:", error);
        }
    };

    // initiating the process of editing a promotion, when the user clicks the edit button.
    const handleEdit = (index) => {
        // retrieve the promotion at the specified index from promotionList
        setPromotion(promotionsList[index]);
        // toggles the component into editing editing mode
        setEditPromotion(true);
        // targets the promotion that is being ediited
        setEditIndex(index);
    }

    return(
    <div className="page-layout">
            <div className="header-container">
                <BusinessHeader />
            </div>

            <div className="main-content">

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
                                type="datetime-local"
                                name="startDate"
                                value={formatDate(promotion.startDate) || ""}
                                onChange={handleChange} 
                                placeholder="Start Date"   
                                />

                                <input
                                type="datetime-local"
                                name="endDate"
                                value={formatDate(promotion.endDate) || ""}
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
                                        <li key={promo._id} className="promotion-item">
                                            <h3>{promo.title}</h3>
                                            <p>{promo.description}</p>
                                            <p>Type: {promo.type} </p>
                                            <p>Discount: {promo.discount ? `${promo.discount}%` : "N/A"}</p>
                                            <p>Start Date: {formatDate(promo.startDate) || "N/A"} </p>
                                            <p>End Date: {formatDate(promo.endDate) || "N/A"} </p>
                                            <button className="btn-edit" onClick={() => handleEdit(index)} >Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(promo._id)}> Delete </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                    </div>

                    
            </div>

            <Footer />
    </div>
    );
};

export default BusinessPromotions;