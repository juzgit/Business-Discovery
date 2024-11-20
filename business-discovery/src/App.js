import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import UserNavBar from "./userPages/UserHeader";
//import HeroSection from "./userPages/HeroSection";
//import UserHomePage from "./userPages/HomePageUser";
import UserDiscoverBusiness from "./userPages/DiscoverBusinessPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<UserDiscoverBusiness />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
