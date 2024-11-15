import React from 'react';
import '../styling/JoinSection.scss';

const JoinSection = () => {
    return(
        <div>
            <h2>Ready to Join?</h2>
            <p>Sign up today and start discovering or sharing your local business!</p>

            <div>
                <a href='#'>Sign Up as User</a>
                <a href='#'>Sign Up as Business</a>
            </div>
        </div>
    );
};

export default JoinSection;