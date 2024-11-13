import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeatureSection";
import SignupSection from "../components/SignupSection";
import Footer from "../components/Footer";

const Homepage = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <SignupSection />
            <Footer />
        </div>
    );
};

export default Homepage;