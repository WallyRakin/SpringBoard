import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from './api.js';

function SignUp({ setToken }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const [errorMsg, setErrorMsg] = useState(null)

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await api.register(formData.username, formData.firstName, formData.lastName, formData.password, formData.email)

        console.log(res)

        if (res.token) { setToken(res.token); setErrorMsg(null); setIsSubmitted(true); }
        else { setErrorMsg(res.error.message); }



    };

    if (isSubmitted) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <button type="submit">Sign Up</button>
            {errorMsg && <p>{errorMsg}</p>}
        </form>
    );
}

export default SignUp;
