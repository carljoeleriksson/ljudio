import React from 'react';
import { FaSistrix } from 'react-icons/fa';

function SearchBar(props) {
  return (
    <div className='search-bar'>
      <img className='logo-header' src='../../assets/logo.svg' alt='Logo' />
      <form className='search-form' onSubmit={props.onClick}>
        <button className='btn-container' type='submit'>
          <FaSistrix className='search-icon' />
        </button>
        <input
          className='search-input'
          type='text'
          placeholder='Search'
          onChange={props.onChange}
        />
        <select className='select' value={props.value} onChange={props.onChange}>
          <option value='search'>All</option>
          <option value='songs'>Songs</option>
          <option value='albums'>Albums</option>
          <option value='artists'>Artists</option>
        </select>
      </form>
      
    </div>
  );
}
export default SearchBar;
