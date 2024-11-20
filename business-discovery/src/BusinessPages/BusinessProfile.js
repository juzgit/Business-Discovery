import React, { useState } from 'react';

const BusinessProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        description: '',
        location: '',
        contact: '',
        socialLinks: '',
        hours: ''
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Profile submitted', profile);
    };

    return(
        <div className='business-profile'>
            <h1 className='business-head'>Business Profile</h1>

            <form className='profile-form'>
                <input 
                type='text'
                name='name'
                value={profile.name}
                onChange={handleChange}
                placeholder='Business Name'
                />

                <textarea
                name='description'
                value={profile.description}
                onChange={handleChange}
                placeholder='Business Description'
                />

                <input 
                type='text'
                name='location'
                value={profile.location}
                onChange={handleChange}
                placeholder='Location'
                />

                <input
                type='text'
                name='socialLinks'
                value={profile.socialLinks}
                onChange={handleChange}
                placeholder='Social Media Links'
                />

                <input
                type='text'
                name='hours'
                value={profile.hours}
                onChange={handleChange}
                placeholder='Operating Hours'
                />
                <button type='button' onClick={handleSubmit}>Save Profile</button>
            </form>
        </div>
    );
};

export default BusinessProfile;