import React, {useState} from "react";
import '../pagesStyling/business-reg.scss';
import { Link, useNavigate } from "react-router-dom";

const BusinessRegister = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        businessType: '',
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const validate = () =>{
        const newErrors = {};

        if(!formData.businessName) newErrors.businessName = 'Business Name is required';
        if(!formData.email) newErrors.email = 'Email is required';
        if(!formData.password) newErrors.password = 'Password is required';
        if(formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if(!formData.businessType) newErrors.businessType = 'Business Type is required';
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
        } else {
            console.log('Form submitted:', formData)
            
            try{
                const response = await fetch ('/api/business/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if(response.ok){
                    alert('Business registered successfully!');
                    console.log('Server response:', data);
                    navigate('/business-login');
                } else {
                    alert(data.message);
                }
            }catch (error){
                console.error(error);
                alert('Error connecting to server');
            }
        }
    }

    return(
        <div className="business-reg-page">
                
                <div className="business-features">
                    <h2 className="business-features-heading">Business Features</h2>

                    <ul className="business-features-listing">
                        <li>Set up your business profile and highlight key details.</li>
                        <li>Advertise special offers, discounts, and event to draw in customers.</li>
                        <li>Monitor customer feedback and track business performance with analytics.</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="business-reg-form">
                <h2 className="business-reg-form-heading">Add a New Business</h2>

                <div className="form-row">
                    <div className="form-group">
                            <label className="label-group">Business Name:</label>
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                placeholder="Enter business name"
                                className="form-input"
                                required
                                />
                                {errors.businessName && <p>{errors.businessName}</p>}
                        </div>

                        <div className="form-group">
                            <label className="label-group">Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                className="form-input"
                                required
                                />
                                {errors.email && <p>{errors.email}</p>}
                        </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                            <label className="label-group">Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter business phone number"
                                className="form-input"
                                required
                                />
                                {errors.phone && <p>{errors.phone}</p>}
                    </div>
                </div>        
                

                <div className="form-row">
                    <div className="form-group">
                        <label className="label-group">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="form-input"
                            required
                            />
                            {errors.password && <p>{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label className="label-group">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter confirm password"
                            className="form-input"
                            required
                            />
                            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group">
                        <label className="label-group">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter street address"
                            className="form-input"
                            required
                            />
                    </div>


                    <div className="form-group">
                        <label className="label-group">Business Type:</label>
                        <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            className="form-input-select"
                            required
                            >

                            <option value=''>Select</option>
                            <option value="Ex1">Gym</option>
                            <option value="Ex2">Fitness Center</option>
                        </select>
                        {errors.businessType && <p className="error-message">{errors.businessType}</p>}
                    </div>
                </div>
               
                <button type="submit" className="submit-button">Add Business</button>
                <p>Do have an account? <Link to="/business-login">Login here</Link></p>

            </form>

        </div>
    );
};

export default BusinessRegister;