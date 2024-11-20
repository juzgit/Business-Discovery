import React from "react";
import UserNavBar from "./UserHeader";
import UserHeroSection from "./UserHeroSection";

const UserHomePage = () => {
    return(
        <div className="userHomePage">
            <UserNavBar />
            <UserHeroSection />
        </div>
    );
};

export default UserHomePage;

