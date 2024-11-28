import React, { useState } from "react";
import '../pagesStyling/user-login-page.scss';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const handleLogin = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitLogin = (e) =>{
        e.preventDefault()
        console.log('Login Attempt', formData)
        //Add API here for user authentication
    };


    return(
        <div className="user-login-page">
            <h2 className="user-login-heading">Login</h2>

            <form onSubmit={submitLogin} className="user-login">
                <div className="form-group">
                    <label className="label-group">Email</label>
                    <input 
                    type="text"
                    name="emailAddress"
                    value={formData.email}
                    onChange={handleLogin}
                    placeholder="Enter email"
                    className="form-input"
                    required
                    />
                </div>

                <div className="form-group">
                    <label className="label-group">Password</label>
                    <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleLogin}
                    placeholder="Enter password"
                    className="form-input"
                    required
                    />
                </div>

                <button type="submit" className="submit-button">Login</button>

                <p>Don't have an account? <Link to="/user-register">Sign-up here</Link></p>
                <p><Link to="/"> <FaHome /> Back Home</Link></p>
            </form>

        </div>
    );
};

export default UserLogin;