import React from 'react';
import '../styling/JoinSection.scss';

const JoinSection = () => {
    return(
        <div className="join-section" >
            <h2 className="join-section__title">Ready to Join?</h2>
            <p className='join-section__description'>Sign up today and start discovering or sharing your local business!</p>

            <div className='join-section__buttons'>
                <a href='#home' className='join-section__link'>Sign Up as User</a>
                <a href='#home' className='join-section__link'>Sign Up as Business</a>
            </div>
        </div>
    );
};

export default JoinSection;