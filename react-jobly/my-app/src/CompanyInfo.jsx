import React, { useEffect, useState } from 'react';
import JobList from './JobList.jsx';
import { useParams, Navigate } from 'react-router-dom';
import { api } from './api.js';

function CompanyInfo({ data, userInfo, fetchUserData }) {
    const { handle } = useParams();
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            const companyData = await api.getCompany(handle);
            setCompany(companyData);
            setLoading(false);
        };
        fetchCompany();
    }, [handle]);

    if (!userInfo) {
        return <Navigate to="/" replace={true} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>{company.name}</h2>
            <h3>{company.description}</h3>

            <JobList searchData={''} data={data.filter(item => item.companyHandle === handle)} userInfo={userInfo} fetchUserData={fetchUserData} />
        </>
    );
}

export default CompanyInfo;
