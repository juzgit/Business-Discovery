import React, { useState } from "react";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotion((prevPromotion) => ({
            ...prevPromotion,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
       if(!promotion.title || !promotion.startDate || !promotion.endDate){
            alert('Please fill in all required fields!');
            return;
        } 

        //updating the existing promotion
        if(editPromotion){
            setPromotionsList( (prevList) => 
                // Create a new list where the item at 'editIndex' is replaced with the updated 'promotion'.
                prevList.map((item, index) => 
                    // Check if the current item's index matches the 'editIndex'.
                                        //Replace the item with the updated 'promotion'.
                                        // otherwise, keep the original item.
                    index === editIndex ? promotion : item
                )
            );
            // Reset the editing state to indicate that editing is complete
            setEditPromotion(false);
            // Reset the index tracking which item is being edited.
            setEditIndex(null);
        } else {
            setPromotionsList((prevList) => [...prevList, promotion]);
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
    };

    const handleDelete = (index) => {
        // Update the state of promotionList by filtering out the item at the specified index.
        //first argument of the filter method is a placeholder, second argument is the index of the current item in the array.
        //the filter method will create a new array excluding the item at 'index'.
        //keep the items whose index does not match the specified 'index'.
        setPromotionsList((prevList) => prevList.filter((_, i) => i !== index));
    }

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
                                            <button className="btn-edit" onClick={() => handleEdit(index)} >Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(index)}> Delete </button>
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