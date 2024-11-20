import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import UserNavBar from "./userPages/UserHeader";
//import HeroSection from "./userPages/HeroSection";
import UserHomePage from "./userPages/HomePageUser";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<UserHomePage />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
