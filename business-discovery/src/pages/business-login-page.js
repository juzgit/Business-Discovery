import React, {useState} from 'react';
import '../pagesStyling/business-login.scss';

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
            </form>
        </div>
    )


}

export default BusinessLogin;