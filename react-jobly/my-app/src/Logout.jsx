import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Logout({ setToken }) {
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        setToken(null);
        setLoggedOut(true);
    }, []);

    return (
        <div>
            {loggedOut && <Navigate to="/" />}
            <p>Logging out...</p>
        </div>
    );
}

export default Logout;
