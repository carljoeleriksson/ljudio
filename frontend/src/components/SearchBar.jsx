import React from 'react'

import { MdPlayCircleOutline, MdPauseCircleOutline, MdSearch } from 'react-icons/md'

function SearchBar(props) {

	return (
		<form onSubmit={props.onClick}>
			<input 
				className="search-input" 
				type="text" 
				placeholder="Search"
				onChange={props.onChange}
			/>
	     <select value={props.value} onChange={props.onChange}>
            <option value="search">All</option>
			<option value="songs">Songs</option> 
            <option value="albums">Albums</option>   
			<option value="artists">Artists</option>       
          </select>
			<button className="search-button" type="submit">
				<MdSearch />
			</button>
		</form>
	)
}
export default SearchBar
