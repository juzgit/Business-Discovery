import React from 'react';
import "../styling/FeatureSectionStyling.scss";

const FeaturesSection = () => {
    return (
        <div className="key-features">
            <h2 className='features-section__title'>Key Features</h2>

            
            <div className='features-section__content'>
                <div className='features-section__block features-section__block--user'>
                    <h3 className='features-section__block-title'>
                        User Features
                    </h3>

                    <ul className='features-section__list'>
                        <li className='features-section__item'>Discover local businesses by category, location, and keyword.</li>
                        <li className='features-section__item'>Leave reviews and ratings to help others find the best spots.</li>
                        <li className='features-section__item'>Get perosnalised recommendations based on your interests.</li>
                    </ul>
                </div>

                <div className='features-section__block features-section__block--business'>
                    <h3 className='features-section__block-title'>Business Features</h3>
                    <ul className='features-section__list'>
                        <li className='features-section__item'>Create a profile and showcase your business.</li>
                        <li className='features-section__item'>Promote offers, discounts, and events to attract.</li>
                        <li className='features-section__item'>Manage customer reviews and track your performance with analytics.</li>
                    </ul>
                </div>
            
            </div>
        </div>

    );
};

export default FeaturesSection;