import React from 'react';
import { FaSistrix } from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext';

function SearchBar(props) {
  const {searchState, updateSearchState, fetchSearchResults} = useContext(SearchContext);


function updateSearchTerm(input) {
  updateSearchState({
    searchTerm: input
  })
}

  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={props.onClick}>
        <button className='btn-container' type='submit'>
          <FaSistrix className='search-icon' />
        </button>
        <input
          className='search-input'
          type='text'
          placeholder='Search'
          onChange={() => updateSearchTerm(target.value)}
        />
        {/* 
        <select className='select' value={props.value} onChange={props.onChange}>
          <option value='search'>All</option>
          <option value='songs'>Songs</option>
          <option value='albums'>Albums</option>
          <option value='artists'>Artists</option>
        </select>
        */}
      </form>
      
    </div>
  );
}
export default SearchBar;
