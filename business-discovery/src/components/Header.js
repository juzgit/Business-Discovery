import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header>
            <nav>
                <Link  to="/" /**add home page here link here */ >Website Name</Link> 

                <div>
                    <Link /**Add user-login(default) or business login page here */ >Log In</Link>
                    <Link /**Add business sign-up or user- here */ >Get Started</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;