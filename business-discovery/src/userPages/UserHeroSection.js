import React, { useEffect, useState } from "react";
import '../userPagesStyling/HeroSection.scss';

const UserHeroSection = () => {

    //hold the first name and last name of the user
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
    });

    //get the user's firts name and last name
    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                const token = localStorage.getItem('userToken');

                //make fetch request to the backend
                const response = await fetch('/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if(!response.ok){
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();

                //update state with user details
                setUser({
                    firstName: data.firstName,
                    lastName: data.lastName
                });
            } catch(error){
                console.error('Error fetching user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, []);

    return(
        <div className="heroSection-container">
            <h2 className="heroSection-text">Welcome {user.firstName} {user.lastName}, Discover Local Gems Near You.</h2>
        </div>
    );
};

export default UserHeroSection;