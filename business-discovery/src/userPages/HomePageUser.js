import React from "react";
import '../userPagesStyling/HomePage.scss';
import UserNavBar from "./UserHeader";
import UserHeroSection from "./UserHeroSection";
import Footer from "../components/Footer";

const UserHomePage = () => {
    const userMetrics = {
        totalReviews: 12,
        favouriteBusinesses: 5,
        promotionsViewed: 3,
    }
    return(
        <div className="userHomePage">
            <UserNavBar />
            <UserHeroSection />

            <div className="dashboard">
                <div className="content">
                    <h1>User Dashboard</h1>

                    <div className="user-overview">
                        <h2>Overview</h2>
                        
                        <div className="metric">
                            <p>Total Reviews Written</p>
                            <h4>{userMetrics.totalReviews}</h4>
                        </div>

                        <div className="metric">
                            <p>Favourite</p>
                            <h4>{userMetrics.favouriteBusinesses}</h4>
                        </div>

                        <div className="metric">
                            <p>Promotions Viewed</p>
                            <h4>{userMetrics.promotionsViewed}</h4>
                        </div>
                    </div>

                    <div className="recommended-business">
                        <h2>Recommended for You</h2>
                        <ul>
                            <li>
                                <a href="#home">Business A</a> - A you business you might like
                            </li>

                            <li>
                                <a href="#home">Business B</a> - A you business you might like
                            </li>

                            <li>
                                <a href="#home">Business C</a> - A you business you might like
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserHomePage;

