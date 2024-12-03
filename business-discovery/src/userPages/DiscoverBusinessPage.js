import React, { useEffect, useState } from 'react';
import UserNavBar from './UserHeader';
import Footer from '../components/Footer';
import '../userPagesStyling/UserDiscoverBusiness.scss';
import { FaSearch } from 'react-icons/fa';

const UserDiscoverBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);

   /* const mockBusinesses = [
        { id: 1, name: 'Cafe Delight', category: 'Cafe', location: 'Downtown' },
        { id: 2, name: 'Tech Store', category: 'Electronics', location: 'Uptown' },
        { id: 3, name: 'Fitness Hub', category: 'Gym', location: 'Suburbs' },
        { id: 4, name: 'Book Nook', category: 'Bookstore', location: 'Uptown' },
      ]; */

      useEffect(() => {
        const fetchBusinesses = async () => {
            try{
                const response = await fetch('/api/business/all');
                const data = await response.json();
                setBusinesses(data);
                setFilteredBusinesses(data);
            } catch(error){
                console.error('Error fetching businesses:', error);
            }
        };

        fetchBusinesses();
      }, []);



      useEffect(() => {
        //Filter businesses based on search query
        setFilteredBusinesses(
            businesses.filter((business) => 
                business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }, [searchQuery, businesses]);


    return(
        <div>
            
                <div className='discover-page'>

                <UserNavBar />
                
                <div className='discover-header'>
                    <h2 className='discover-heading'>Discover Local Businesses</h2>
                    <input 
                    type='text'
                    placeholder='Search for businesses...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className='search-btn'> <FaSearch /> </button>
                </div>

                <div className='business-list'>
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map((business) => (
                            <div key={business.name} className='business-card'>
                                <h3>{business.businessName}</h3>
                                <p>{business.businessType}</p>
                                <p>{business.address}</p>
                                <button>View Details</button>
                            </div>
                        ))
                    ) : (
                        <p>No businesses found</p>
                    )}
                </div>
            </div>
        <Footer />
        </div>
    );
};

export default UserDiscoverBusiness;