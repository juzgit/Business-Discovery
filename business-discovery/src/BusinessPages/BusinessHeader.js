import React from "react";
import { FaDoorOpen } from "react-icons/fa";
import '../businessPageStyling/businessHeader.scss';
import BusinessMenuHeader from "./BusinessMenuHeaderComponent";

const BusinessHeader = () => {
    return(
        <div className="header">

            <div className="header-left">
                <BusinessMenuHeader />
                <h2 className="business-name">LocalConnect</h2>
            </div>
            
            <div className="header-right">
                <button className="log-out-btn">
                    Logout <FaDoorOpen /> 
                </button>
            </div>
        </div>
    );
};

export default BusinessHeader;