import React, { useState } from "react";
import '../pagesStyling/user-login-page.scss';
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const UserLogin = () => {
    const [formData, setFormData] = useState({
        emailAddress:'',
        password:''
    });

    const navigate = useNavigate();

    const handleLogin = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitLogin = async (e) =>{
        e.preventDefault()
        console.log('Login Attempt', formData);

        const backendUrl = 'https://business-discovery-backend.onrender.com';
        //Add API here for user authentication
        try{
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('userToken', data.token);
                alert('You have logged in');
                console.log("Login successfull:", data);
                navigate('/user-homepage');
            } else if (response.status === 401){
                alert('Invalid credentials. Please try again');
            } else if ( response.status === 500){
                alert('Internal Server Error');
            }
        } catch (error){
            console.error('Error during login:', error);
        }

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
                    value={formData.emailAddress}
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