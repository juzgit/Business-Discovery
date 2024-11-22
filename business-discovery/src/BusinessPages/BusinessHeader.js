import React from "react";
import { FaEdit, FaUpload, FaInfo, FaDoorOpen } from "react-icons/fa";
import '../businessPageStyling/businessHeader.scss';

const BusinessHeader = () => {
    return(
        <div className="header">
            <div className="business-name-header">
                <h2 className="business-name">LocalConnect</h2>
            </div>

            <div className="actions">
                <button className="action-btn">
                    <a href="#home">Create New Promotion <FaUpload/> </a> {/**Takes you the promotions page */}
                </button>

                <button className="action-btn">
                    <a href="#home">Edit Profile <FaEdit/> </a> {/**Takes you to Edit Profile page */}
                </button>

                <button className="action-btn">
                    <a href="#home">Read Reviews <FaInfo /> </a> {/**Takes you to the Reviews Page */}
                </button>
            </div>

            <div className="user-profile">
                <button className="log-out-btn">Logout <FaDoorOpen /> </button>
            </div>
        </div>
    );
};

export default BusinessHeader;