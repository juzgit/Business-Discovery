import React, { useState } from "react";

const Register = () =>{
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
        <div>
            
            <div>
                /**Information about the page goes here */
            </div>



            <form onSubmit={submitForm}>
                <h2>Sign Up</h2>
                
                <div>
                    <label>First Name</label>
                    
                    <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleForm}
                    required
                    />
                </div>


                <div>
                    <label>Last Name</label>
                    
                    <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleForm}
                    required
                    />
                </div>


                <div>
                    <label>Email Address</label>
                    
                    <input 
                    type="text"
                    name="emailAddress"
                    value={formData.emailAdress}
                    onChange={handleForm}
                    required
                    />
                </div>

                <div>
                    <label>User Name</label>
                    
                    <input 
                    type="text"
                    name="userName"
                    value={formData.username}
                    onChange={handleForm}
                    required
                    />
                </div>

                <div>
                    <label>Password</label>
                    
                    <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleForm}
                    required
                    />
                </div>


                <div>
                    <label>Confirm Password</label>
                    
                    <input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleForm}
                    required
                    />
                </div>

                <button type="submit">Sign-Up</button>
            </form>
        </div>
    );
};

export default Register;