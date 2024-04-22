import React from 'react';

function SearchForm({ setSearchData }) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setSearchData(e.target.elements.search.value);
        }}>
            <input name="search" type="text" placeholder="Search" />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;
