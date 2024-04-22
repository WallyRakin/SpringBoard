import React from 'react';
import { api } from './api';

function JobList({ searchData, data, userInfo, fetchUserData }) {

    const handleClick = async (id) => {
        await api.applyToJob(id)
        fetchUserData()
    }

    return (
        <ul>
            {data.filter(item => item.title.toLowerCase().includes(searchData.toLowerCase())).map((item) => (
                <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p className='list-info'>Salary: {item.salary}</p>
                    <p className='list-info'>Equity: {item.equity ? item.equity : 0}</p>
                    {!userInfo.applications.includes(item.id)
                        ? <button type="button" onClick={() => { handleClick(item.id) }}>Apply</button>
                        : <button disabled="disabled">Applied</button>}

                </li>
            ))}
        </ul>
    );
}

export default JobList;
