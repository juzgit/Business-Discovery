import React, {useState} from 'react';
import '../pagesStyling/business-login.scss';
import { Link, useNavigate } from 'react-router-dom';

const BusinessLogin = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const validate = () => {
        const newErrors = {};
        if(!formData.email) newErrors.email = 'Email is required';
        if(!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
        }else {
            console.log('Form Submitted:', formData);
            //Add API call logic here to peform authentication

            try{
                const response = await fetch('/api/business/login', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if(response.ok){
                    localStorage.setItem('businessToken', data.token);
                    alert('You gave logged in');
                    console.log('Server response:', data);
                    navigate('/business-dashboard')
                } else if (response.status === 401){
                    alert('Invalid credentials. Please try again');
                }else if (response.staus === 500){
                    alert('Internal Server Error');
                }
            } catch(error){
                console.error('Error during login:', error);
            }
        }
    };

    return (
        <div className='business-login'>
            <form onSubmit={handleLogin} className='business-login-form'>
                
                <h2 className='business-login-heading'>Business Login</h2>
                <div className='form-group'>
                    <label className='label-group'>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='form-input'
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className='form-group'>
                    <label className='label-group'>Password</label>
                    <input 
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='form-input'
                    />

                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button type='submit' className='submit-button'>Login</button>
                <p>Don't have an account? <Link to="/business-register">Register here</Link></p>
            </form>
        </div>
    )


}

export default BusinessLogin;