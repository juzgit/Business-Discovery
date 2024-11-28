import React, { useState } from "react";
import '../pagesStyling/user-reg-page.scss';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const UserRegister = () =>{
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAdress: '',
        username:'',
        password:'',
        confirmPassword:''
    });

    const handleForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**Check if the passwords when submitting the form */
    const submitForm = (e) =>{
        e.preventDefault()

        if(formData.password !== formData.confirmPassword){
            alert('Passwords Do Not Match')
            return
        }
        console.log('Form Submitted:', formData)
    };

    /**Display the form */
    return (
        <div className="register-page">
            
            <div className="register-info">
                <h2 className="info-title">User benefits</h2>
                <ul className="info-list">
                    <li>
                        <strong>Explore Local Business:</strong> Easily find businesses tailored to your needs by searching searching through categories, locations, or specific keywords.
                    </li>

                    <li>
                        <strong>Share Your Experience:</strong> Leave reviews and ratings to guide others in discovering top-notch places.
                    </li>

                    <li>
                        <strong>Personalised Suggestions:</strong>  Receive recommendations crafted for you, based on your prederences and interests.
                    </li>
                </ul>
            </div>



            <form onSubmit={submitForm} className="register-form">
                <h2 className="form-title">Sign Up</h2>
                
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        
                        <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleForm}
                        className="form-input"
                        placeholder="Enter first name"
                        required
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        
                        <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleForm}
                        className="form-input"
                        placeholder="Enter last name"
                        required
                        />
                    </div>
                </div>

                
                <div className="form-row">
                    
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        
                        <input 
                        type="text"
                        name="emailAddress"
                        value={formData.emailAdress}
                        onChange={handleForm}
                        className="form-input"
                        placeholder="Enter email address"
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        
                        <input 
                        type="text"
                        name="userName"
                        value={formData.username}
                        onChange={handleForm}
                        className="form-input"
                        placeholder="Enter username"
                        required
                        />
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        
                        <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleForm}
                        placeholder="Enter password"
                        className="form-input"
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        
                        <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleForm}
                        className="form-input"
                        placeholder="Confirm your password"
                        required
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">Sign-Up</button>
                <p>Do have an account? <Link to="/user-login">Login here</Link></p>
                <p><Link to="/"> <FaHome /> Back Home</Link></p>
            </form>
        </div>
    );
};

export default UserRegister;