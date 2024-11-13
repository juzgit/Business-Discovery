import React, {useState} from "react";

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

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const validate = () =>{
        const newErrors ={};

        if(!formData.businessName) newErrors.businessName = 'Business Name is required';
        if(!formData.email) newErrors.email = 'Email is required';
        if(!formData.password) newErrors = 'Password is required';
        if(formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if(!formData.businessType) newErrors.businessType = 'Business Type is required';
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Objects.keys(validationErrors).length > 0){
            setErrors(validationErrors)
        } else {
            console.log('Form submitted:', formData)
            // Add the API call here for submission logic
        }
    }

    return(
        <div>
            <h1>Business Registration</h1>

            <form onSubmit={handleRegister}>
                <h2>Add a New Business</h2>

                <div>
                    <label>Business Name:</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        />
                        {errors.businessName && <p>{errors.businessName}</p>}
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                        {errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                        {errors.password && <p>{errors.password}</p>}
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="text"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        required
                        >

                        <option value=''>Select</option>
                        <option value="Ex1">Gym</option>
                        <option value="Ex2">Fitness Center</option>
                    </select>
                    {errors.businessType && <p>{errors.businessType}</p>}
                </div>
                
                <button type="submit">Add Business</button>

            </form>


        </div>

    );

};

export default BusinessRegister;