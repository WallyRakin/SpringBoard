import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from './api.js';

function UpdateProfile({ userInfo, setUserInfo }) {
    const [formData, setFormData] = useState(userInfo);
    const [errorMsg, setErrorMsg] = useState(null);
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
        const res = await api.updateProfile(formData.firstName, formData.lastName, formData.password, formData.email);
        if (res.data) {
            setUserInfo(res.data.user);
            setErrorMsg(null);
            setIsSubmitted(true);
        } else {
            setErrorMsg(res.error.message);
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                name="username"
                value={userInfo.username}
                id="username"
                required
            />
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                required
            />
            <label htmlFor="firstName">First Name: </label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                id="firstName"
                required
            />
            <label htmlFor="lastName">Last Name: </label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                id="lastName"
                required
            />
            <label htmlFor="email">Email: </label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                required
            />
            <button type="submit">Update Profile</button>
            {errorMsg && <p>{errorMsg}</p>}
        </form>
    );
}

export default UpdateProfile;
