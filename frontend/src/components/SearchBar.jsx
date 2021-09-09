import React, { useState, useEffect, createContext } from 'react'

function SearchBar(props) {

	return (
		<>
		<input 
			className="search-input" 
			type="text" 
			placeholder="Search..."
			onChange={props.onChange}
			/>
		<button type="button" onClick={props.onClick}>
			Search
		</button>	
		</>
	)
}
/* maybe put in the searchresult-component

if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {songs.map(song => (
              <li key={song.id}>
                {song.name} {song.artist.name}
              </li>
            ))}
          </ul>
        );
	}
*/

export default SearchBar
