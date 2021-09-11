import React from 'react'

import { Button, Grid, TextField, IconButton } from '@material-ui/core'
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
			<IconButton className="search-button" type="submit">
				<MdSearch />
			</IconButton>
		</form>
	)
}
export default SearchBar
