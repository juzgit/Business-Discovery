import React, { useState } from 'react';
import '../businessPageStyling/BusinessProfilePage.scss';
import { FaEdit, FaSave } from 'react-icons/fa';
import BusinessHeader from './BusinessHeader';
import Footer from '../components/Footer';

const BusinessProfile = () => {
    //mock business data
    const [businessData, setBusinessData] = useState({
        name: "Joe Doe's Wings",
        description: 'Get the best wings.',
        address: '123 Long Street, Townville',
        phone: '021 123 4567',
        email: 'johndoe@example.com',
        hours: 'Mon-Fri: 7am - 8pm, Sat-Sun: 8am - 6pm',
        businessWebsite: "joedoeswings.com",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(businessData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBusinessData(updatedData);
        setIsEditing(false);
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
                                            <label className='label-group'>Name:</label>
                                            <input
                                            type='text'
                                            name='name'
                                            value={updatedData.name}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>

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
                                            name='website'
                                            value={updatedData.businessWebsite}
                                            onChange={handleChange}
                                            className='input-group'
                                            />
                                        </div>
                                        <button className='save-btn' type='submit'>Save Changes <FaSave /> </button>
                                    </form>
                                ): (
                                    <>
                                    <h2>Name: {businessData.name}</h2>
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

