import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SearchForm from './SearchForm';

function Search({ userInfo, data, List, fetchUserData }) {
    const [searchData, setSearchData] = useState('');

    if (!userInfo) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <SearchForm setSearchData={setSearchData} />
            <List data={data} searchData={searchData} userInfo={userInfo} fetchUserData={fetchUserData} />
        </div>
    );
}

export default Search;
