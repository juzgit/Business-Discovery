import React from 'react';
import '../componentsStyling/JoinSection.scss';
import { Link } from 'react-router-dom';

const JoinSection = () => {
    return(
        <div className="join-section" >
            <h2 className="join-section__title">Ready to Join?</h2>
            <p className='join-section__description'>Sign up today and start discovering or sharing your local business!</p>

            <div className='join-section__buttons'>
                <Link to='/user-register' className='join-section__link'>Sign Up as User</Link>
                <Link to='/business-register' className='join-section__link'>Sign Up as Business</Link>
            </div>
        </div>
    );
};

export default JoinSection;