import React from 'react'

function SearchBar(props) {

	return (
		<>
		<input 
			className="search-input" 
			type="text" 
			placeholder="Search"
			onChange={props.onChange}
			/>
		<button className="search-button" type="button" onClick={props.onClick}>
			Search
		</button>	
		</>
	)
}
export default SearchBar
