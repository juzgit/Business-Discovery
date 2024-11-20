import React, { useState } from 'react';
import UserNavBar from './UserHeader';
import '../userPagesStyling/UserDiscoverBusiness.scss';
import { FaSearch } from 'react-icons/fa';

const UserDiscoverBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    return(
        <div className='discover-page'>

            <UserNavBar />
            
            <div className='discover-header'>
                <h2 className='discover-heading'>Discover Local Businesses</h2>
                <input 
                type='text'
                placeholder='Search for businesses...'
                />

                <button className='search-btn'> <FaSearch /> </button>
            </div>

            <div className='business-list'>
                {businesses.length > 0 ? (
                    businesses.map((business) => (
                        <div key={business.id} className='business-card'>
                            <h3>{business.name}</h3>
                            <p>{business.category}</p>
                            <p>{business.location}</p>
                            <button>View Details</button>
                        </div>
                    ))
                ) : (
                    <p>No businesses found</p>
                )}
            </div>
        </div>
    );
};

export default UserDiscoverBusiness;