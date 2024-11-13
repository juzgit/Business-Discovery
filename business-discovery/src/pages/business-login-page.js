import React, {useState} from 'react';

const BusinessLogin = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const validate = () => {
        const newErrors = {};
        if(!formData.email) newErrors.email = 'Email is required';
        if(!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
        }else {
            console.log('Form Submitted:', formData);
            //Add API call logic here to peform authentication
        }
    };

    return (
        <div>
            <h2>Business Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input 
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    />

                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )


}

export default BusinessLogin;