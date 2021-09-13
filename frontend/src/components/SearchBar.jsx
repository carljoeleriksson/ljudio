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
			<button className="search-button" type="submit">
				<MdSearch />
			</button>
		</form>
	)
}
export default SearchBar
