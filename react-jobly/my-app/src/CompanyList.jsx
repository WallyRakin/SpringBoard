import React from 'react';
import { Link } from 'react-router-dom';

function CompanyList({ searchData, data }) {
    return (
        <ul>
            {data.filter(item => item.name.toLowerCase().includes(searchData.toLowerCase())).map((item) => (
                <li key={item.handle}>
                    <h3><Link to={`/companies/${item.handle}`}>{item.name}</Link></h3>
                    <p className='list-info'>{item.description}</p>
                </li>
            ))}
        </ul>
    );
}

export default CompanyList;
