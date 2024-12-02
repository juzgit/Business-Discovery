import React, { useState } from 'react';
import UserNavBar from './UserHeader';
import Footer from '../components/Footer';
import { FaDoorOpen, FaEdit, FaSave } from 'react-icons/fa';
import '../userPagesStyling/UserProfile.scss';

const UserProfile = () => {

    const [userData, setUserData] = useState({
        name: 'John Doe',
        userName: 'johndoe',
        email: 'johndoe@example.com',
        bio: 'A coffee enthusiast who loves exploring new places.',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(userData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData(updatedData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        console.log('Logging out...');
    };

    return (
    <div>
         <UserNavBar />
            <div className='profile-page'>
            
            <div className='profile-header'>
                

                <div className='profile-info'>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label className='label-group'>Name:</label>
                                <input
                                type='text'
                                name='name'
                                value={updatedData.name}
                                onChange={handleChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label className='label-group'>Username:</label>
                                <input
                                type='text'
                                name='userName'
                                value={updatedData.userName}
                                onChange={handleChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label className='label-group'>Email:</label>
                                <input
                                type='text'
                                name='email'
                                value={updatedData.email}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='label-group'>Bio:</label>
                                <textarea
                                name='bio'
                                value={updatedData.bio}
                                onChange={handleChange}
                                />
                            </div>
                            <button className='save-btn' type='submit'>Save Changes <FaSave /> </button>
                        </form>
                    ): (
                        <>
                        <h2>Name: {userData.name}</h2>
                        <p>Username: {userData.userName}</p>
                        <p>Email: {userData.email}</p>
                        <p>Bio: {userData.bio}</p>
                        <button className='edit-btn' onClick={() => setIsEditing(true)}>
                            Edit Profile <FaEdit />
                        </button>
                        </>
                    )}
                </div>
            </div>

            {/**Maybe add profile activity here */}

            <button className='logout-btn'onClick={handleLogout}>Logout <FaDoorOpen/> </button>
        </div>

        <Footer />
    </div>
       
    );
};

export default UserProfile;