import React, { useState, useEffect } from 'react'

function Search() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	async function fetchSearchResult(){

		const response = await fetch('http://localhost:8000/api/search', {
			method: 'POST',
			body: JSON.stringify({
				"searchType": "search",
				"keyWord": searchTerm
			}),
			headers: {
			  'Content-Type': 'application/json'
			}
		})
		const data = await response.json();
		console.log('Unfiltered searchresult:', data.content)
		if(data){
			setIsLoaded(true)
			setSearchResult(data.content)
		} else {
			setIsLoaded(true)
			setError(error)
		}
	}
	return (
		<>
		<input 
			className="search-input" 
			type="text" 
			placeholder="Search..."
			value={searchTerm}
			onChange={e => setSearchTerm(e.target.value)}
			/>
		<button type="button" onClick={fetchSearchResult}>
			Search!
		</button>	
		{/* SEARCH RESULTS SONGS */}
		<div className="songResContainer">
			<ul className="songResults">
				{
				searchResult.filter(content => content.type == "song")
				.map(song => (
				<li key={song.videoId}>
					<p className="song-title">{song.name}</p>
					<p className="artist-name">{song.artist.name}</p>
				</li>
				))
				}
			</ul>
		</div>
		{/* SEARCH RESULTS ARTISTS */}
		<div className="artistResContainer">
			<ul className="artistResults">
				{
				searchResult.filter(content => content.type == "artist")
				.map(artist => (
				<li key={artist.browseId}>
					<p className="artist-name">{artist.name}</p>
				</li>
				))
				}
			</ul>
		</div>
		{/* SEARCH RESULTS ALBUMS */}
		<div className="albumResContainer">
			<ul className="albumResults">
				{
				searchResult.filter(content => content.type == "album")
				.map(album => (
				<li key={album.browseId}>
					<p className="album-name">{album.name}</p>
				</li>
				))
				}
			</ul>
		</div>
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

export default Search
