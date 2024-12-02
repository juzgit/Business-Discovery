import React from "react";
import { Route, Routes } from "react-router-dom";

//main homepage
import Homepage from "./startPages/HomePage";

//user register and login
import UserRegister from "./startPages/user-reg-page";
import UserLogin from "./startPages/user-login-page";

//business user register and login
import BusinessRegister from "./startPages/business-reg-page";
import BusinessLogin from "./startPages/business-login-page";

// Normal user end
import UserHomePage from "./userPages/HomePageUser";
import UserDiscoverBusiness from "./userPages/DiscoverBusinessPage";
import CategoriesPage from "./userPages/CategoriesPage";
import UserProfile from "./userPages/UserProfilePage";

// Businesss User end pages
import BusinessUserHP from "./BusinessPages/BusinessUserHP";
import BusinessProfile from "./BusinessPages/BusinessProfile";
import BusinessPromotions from "./BusinessPages/PromotionsPage";
import BusinessReviews from "./BusinessPages/ReviewsPage";

function App() {
  return (
    <div className="App">
            <Routes>
              {/**Starter pages */}
              <Route path="/" element={<Homepage />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/business-register" element={<BusinessRegister />} />
              <Route path="/business-login" element={<BusinessLogin />} />

              {/**User end pages */}
              <Route path="/user-homepage" element={<UserHomePage />} />
              <Route path="/user-discover" element={<UserDiscoverBusiness />} />
              <Route path="/user-categories" element={<CategoriesPage />} />
              <Route path="/user-profile" element={<UserProfile />} />

              {/**Business end pages */}
              <Route path="/business-dashboard" element={<BusinessUserHP />} />
              <Route path="/business-profile" element={<BusinessProfile />} />
              <Route path="/business-promotions" element={<BusinessPromotions />} />
              <Route path="/business-reviews" element={<BusinessReviews />} />
            </Routes>
    </div>
  );
};

export default App;
