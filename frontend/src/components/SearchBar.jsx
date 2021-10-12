import React, { useState, useContext } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext';
import { useHistory } from 'react-router-dom'

function SearchBar(props) {
  const { searchState, updateSearchState, fetchSearchResult } = useContext(SearchContext);
  
  let history = useHistory();

function handleSubmit(e) {
  e.preventDefault()
  fetchSearchResult()
  history.push('/search')
}

function updateSearchTerm(input) {
  updateSearchState({
    searchTerm: input
  })
}

function updateSearchType(input) {
  updateSearchState({
    searchType: input
  })
}

  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={handleSubmit}>
        <button className='btn-container' type='submit'>
          <FaSistrix className='search-icon' />
        </button>
        <input
          className='search-input'
          type='text'
          placeholder='Search'
          onChange={(e) => updateSearchTerm(e.target.value)}
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
