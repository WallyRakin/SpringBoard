import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, userInfo }) {
    return (
        <nav>
            {userInfo && <div><h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2></div>}
            <div>
                <Link to="/">Home</Link> |
                {!(token == null || token === 'null') ? (
                    <>
                        <Link to="/companies">Companies</Link>|
                        <Link to="/jobs">Jobs</Link>|
                        <Link to="/profile">Profile</Link>|
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>|
                        <Link to="/signup">Sign-up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
