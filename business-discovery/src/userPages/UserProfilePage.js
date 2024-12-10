import React, { useState, useEffect } from 'react';
import UserNavBar from './UserHeader';
import Footer from '../components/Footer';
import { FaDoorOpen, FaEdit, FaSave } from 'react-icons/fa';
import '../userPagesStyling/UserProfile.scss';

const UserProfile = () => {
    
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(userData);

    const fetchUserProfile = async () => {
        try{
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const data = await response.json();
            if(response.ok){
                setUserData(data);
                setUpdatedData(data);
            }else {
                alert(data.message || 'Failed to fetch user profile');
            }
        } catch (err){
            alert('An error occurred while fetching the profile');
            console.error(err);
        }
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Beare ${token}`,
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            if(response.ok){
                setUserData(data);
                setIsEditing(false);
            } else{
                alert(data.message || 'Failed to update profile');
            }
        } catch(err){
            console.error(err);
            alert('An error occurred while updating the profile');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };


    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.href = '/user-login'
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
    <div>
         <UserNavBar />
            <div className='profile-page'>
            
            <div className='profile-header'>
                

                <div className='profile-info'>
                    
                    {userData ? (
                            isEditing ? (
                                <form onSubmit={updateUserProfile}>
                                    <div className="form-group">
                                        <label className="label-group">First Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedData.firstName || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="label-group">Last Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedData.lastName || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="label-group">Username:</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            value={updatedData.username || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="label-group">Email:</label>
                                        <input
                                            type="text"
                                            name="emailAddress"
                                            value={updatedData.emailAddress || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label-group">Bio:</label>
                                        <textarea
                                            name="bio"
                                            value={updatedData.bio || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button className="save-btn" type="submit">
                                        Save Changes <FaSave />
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h2>Name: {userData.firstName} {userData.lastName}</h2>
                                    <p>Username: {userData.username}</p>
                                    <p>Email: {userData.emailAddress}</p>
                                    <p>Bio: {userData.bio}</p>
                                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                        Edit Profile <FaEdit />
                                    </button>
                                </>
                            )
                        ) : (
                            <p>Loading...</p>
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