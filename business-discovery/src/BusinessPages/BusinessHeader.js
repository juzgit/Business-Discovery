import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";
import '../businessPageStyling/businessHeader.scss';
import BusinessMenuHeader from "./BusinessMenuHeaderComponent";

const BusinessHeader = () => {

    const navigate = useNavigate();

    const Logout = async () =>{
        try{
            localStorage.removeItem('businessToken');
            navigate('/');
        } catch(error){
            console.error('Error logging out:', error);
        }
    }

    return(
        <div className="header">

            <div className="header-left">
                <BusinessMenuHeader />
                <h2 className="business-name"><Link to="/business-dashboard">LocalConnect</Link></h2>
            </div>
            
            <div className="header-right">
                <button onClick={Logout} className="log-out-btn">
                    Logout <FaDoorOpen /> 
                </button>
            </div>
        </div>
    );
};

export default BusinessHeader;