import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeatureSection";
import JoinSection from "../components/JoinSection";
import Footer from "../components/Footer";


const Homepage = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <JoinSection />
            <Footer />
        </div>
    );
};

export default Homepage;