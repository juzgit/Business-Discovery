import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import UserNavBar from "./userPages/UserHeader";
//import HeroSection from "./userPages/HeroSection";
//import UserHomePage from "./userPages/HomePageUser";
//import UserDiscoverBusiness from "./userPages/DiscoverBusinessPage";
//import CategoriesPage from "./userPages/CategoriesPage";
//import UserProfile from "./userPages/UserProfilePage";


//import BusinessUserHP from "./BusinessPages/BusinessUserHP";
//import BusinessHeader from "./BusinessPages/BusinessHeader";
//import BusinessMenuHeader from "./BusinessPages/BusinessMenuHeaderComponent";
//import BusinessProfile from "./BusinessPages/BusinessProfile";
import BusinessPromotions from "./BusinessPages/PromotionsPage";
//import BusinessReviews from "./BusinessPages/ReviewsPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<BusinessPromotions />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
