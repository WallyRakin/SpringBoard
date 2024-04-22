import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from './api.js';

function Login({ setToken }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState([]);
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
        const res = await api.login(formData.username, formData.password);
        if (res.data && res.data.token) {
            setToken(res.data.token);
            setErrorMsg([]);
            setIsSubmitted(true);
        } else {
            setErrorMsg([res.error.message]);
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
            {errorMsg.length > 0 && errorMsg.map((msg, index) => <p key={index}>{msg}</p>)}
        </form>
    );
}

export default Login;
