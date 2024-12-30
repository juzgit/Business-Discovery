import React, { useState, useEffect } from 'react';
import '../businessPageStyling/BusinessProfilePage.scss';
import { FaEdit, FaSave } from 'react-icons/fa';
import BusinessHeader from './BusinessHeader';
import Footer from '../components/Footer';

const BusinessProfile = () => {
    //mock business data
    const [businessData, setBusinessData] = useState({
        description: '',
        address: '',
        phone: '',
        email: '',
        hours: '',
        businessWebsite: '',
    });

    const fetchBusinessProfile = async () => {
        const token = localStorage.getItem('businessToken');
        console.log('businessToken:', token);

        const backendUrl = 'https://business-discovery-backend.onrender.com';

        try{
            const response = await fetch(`${backendUrl}/api/business/profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if(!response.ok){
                throw new Error('Failed to fetch profile details.')
            }

            const data = await response.json();
            setBusinessData(data);
            console.log('Business Profile:', data);
        } catch (error){
            console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        fetchBusinessProfile();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(businessData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    //update the business details
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('businessToken');
        console.log('Token:', token);

        const backendUrl = 'https://business-discovery-backend.onrender.com';

        try{
            const response = await fetch(`${backendUrl}/api/business/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if(!response.ok){
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setBusinessData(data); //update state with new data
            setIsEditing(false); // Exit edit mode after saving
            alert('Profile updated successfully!');
        } catch(error){
            console.error('Error updating profile:', error);
            alert('There was an error updating the profile');
        }
    };

    return (
        <div className='page-layout'>
                <div className='header-container'>
                    <BusinessHeader />
                </div>

            <div className='main-content'>

                    <div className='profile-page'>

                        <div className='profile-header'>
                            
                            <div className='profile-info'>
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className='profile-form'>

                                        <div className='form-group'>
                                            <label className='label-group'>Description:</label>
                                            <textarea
                                            name='description'
                                            value={updatedData.description}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label className='label-group'>Email:</label>
                                            <input
                                            type='text'
                                            name='email'
                                            value={updatedData.email}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label className='label-group'>Phone:</label>
                                            <input
                                            type='text'
                                            name='phone'
                                            value={updatedData.phone}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label className='label-group'>Hours:</label>
                                            <input
                                            type='text'
                                            name='hours'
                                            value={updatedData.hours}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label className='label-group'>Website:</label>
                                            <input
                                            type='text'
                                            name='businessWebsite'
                                            value={updatedData.businessWebsite}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>
                                        <button className='save-btn' type='submit'>Save Changes <FaSave /> </button>
                                    </form>
                                ): (
                                    <>
                                    <h2>Name: {businessData.businessName}</h2>
                                    <p>Description: {businessData.description}</p>
                                    <p>Phone: {businessData.phone}</p>
                                    <p>Email: {businessData.email}</p>
                                    <p>Hours: {businessData.hours}</p>
                                    <p>Website: {businessData.businessWebsite}</p>
                                    <button className='edit-btn' onClick={() => setIsEditing(true)}>
                                        Edit Profile <FaEdit />
                                    </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
       
    );
};

export default BusinessProfile;

