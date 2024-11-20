import React, { useState } from 'react';
import UserNavBar from './UserHeader';

const UserProfile = () => {


    return (
        <div className='profile-page'>
            <UserNavBar />
            <div className='profile-header'>
                /**Add Profile Picture here */

                <div className='profile-info'>
                    /**Add profile info here */
                </div>
            </div>
        </div>
    )
}

export default UserProfile;