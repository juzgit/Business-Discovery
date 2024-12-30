import React, { useState, useEffect } from "react";
import '../pagesStyling/business-reg.scss';
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

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

    const [categories, setCategories] = useState([]);

    const [errors, setErrors] = useState({});

    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const navigate = useNavigate();

    //use the nomnatim OSM API for address suggestions

    //fetch street suggestions entered by the user.
    //suggestions limit is 5 and restricted in South Africa.
    const fetchAddressSuggestions = async (query) => {
        try{
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=ZA`, {
                headers: { 'User-Agent': 'BusinessDiscovery/1.0'},
            }
        );

        //if the response is not ok, throw an error
        if(!response.ok){
            throw new Error('Error fetching address suggestions.');
        }
            //if response is successful, it is parsed as JSON.
            const data = await response.json();
            //update the dropdown with the suggested addresses.
            setSuggestions(data);
        } catch(error){
            console.error('Error fetching address suggestions:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'phone'){
            //only numbers allowed
            const formattedValue = value.replace(/\D/g,'');

            //limit the length to 10 digits
            if(formattedValue.length > 10){
                return; //cannot put add more digits if the input is more than 10 digits.
            }
            setFormData({...formData, [name]: formattedValue });
        } else {
            setFormData({...formData, [name]: value})
        }

        //in the address input field
        //show the address suggestions if the characters are more than 2.
        if(name === 'address' && value.length > 2){
            fetchAddressSuggestions(value);
        } else if (name === 'address'){
            //less than 2 show no suggestions
            setSuggestions([]);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const backendUrl = 'https://business-discovery-backend.onrender.com';
            try{
                const response = await fetch(`${backendUrl}/api/categories`);
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch(error){
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const validate = () =>{
        const newErrors = {};

        //throw errors if the input fields are empty.
        if(!formData.businessName) newErrors.businessName = 'Business Name is required';
        if(!formData.email) newErrors.email = 'Email is required';
        if(!formData.password) newErrors.password = 'Password is required';
        //if the passwords do not match, throw an error.
        if(formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if(!formData.businessType) newErrors.businessType = 'Business Type is required';

        //phone length must be 10 digits
        //if no phone number is in the input
        //throw an error
        if(!formData.phone){
            newErrors.phone = 'Phone number is required';
        } else if(!/^\d{10}$/.test(formData.phone)){
            newErrors.phone = 'Phone number must be exactly 10 digits.';
        }


        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
        } else {
            const formattedData = {
                ...formData,
                //convert to South Africa's country code
                phone: `+27{formData.phone.slice(1)}`, //converts 012345678 to +27712345678
            };
            console.log('Form submitted:', formattedData)

            const backendUrl = 'https://business-discovery-backend.onrender.com';
            
            try{
                const response = await fetch (`${backendUrl}/api/business/register`, {
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
                                placeholder="Enter business phone number e.g. 0712345678"
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

                            {/**Dropdown suggestions */}
                            {suggestions.length > 0 && (
                                <ul className='suggestions-list'>
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                        key={index}
                                        onClick={() => {
                                            setSelectedAddress(suggestion.display_name);
                                            setFormData({ ...formData, address: suggestion.display_name });
                                            setSuggestions([]);
                                        }}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            
                            <option value="">select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.businessType && <p className="error-message">{errors.businessType}</p>}
                    </div>
                </div>
               
                <button type="submit" className="submit-button">Add Business</button>
                <p>Do have an account? <Link to="/business-login">Login here</Link></p>
                <p><Link to="/"> <FaHome /> Back Home</Link></p>

            </form>

        </div>
    );
};

export default BusinessRegister;