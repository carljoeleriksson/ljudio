import React from 'react';
import { FaSistrix } from 'react-icons/fa';

function SearchBar(props) {
  return (
    <form className='search-form' onSubmit={props.onClick}>
      <FaSistrix className='search-icon' onClick></FaSistrix>
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
  );
}
export default SearchBar;
