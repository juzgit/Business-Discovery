import React, { useState } from "react";

const Login = () => {
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
        <div>
            <h2>Login</h2>

            <form onSubmit={submitLogin}>
                <div>
                    <label>Email</label>
                    <input 
                    type="text"
                    name="emailAddress"
                    value={formData.email}
                    onChange={handleLogin}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleLogin}
                    />
                </div>
            </form>

            <button type="submit">Login</button>

            <p>Don't have an account? Sign-up here</p>
        </div>
    );
};

export default Login