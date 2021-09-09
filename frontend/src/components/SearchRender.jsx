import React from 'react'



function SearchRender(searchResult) {
	return 	(<>
		<div className="songResContainer">
			<h2>Songs</h2>
			<ul className="songResults">
				{
				searchResult.searchResult.filter(content => content.type == "song")
				.map(song => (
				<li key={song.videoId}>
					<p className="song-title">{song.name}</p>
					<p className="artist-name">{song.artist.name}</p>
				</li>
				))
				}
			</ul>
		</div>

		<div className="artistResContainer">
			<h2>Artists</h2>
			<ul className="artistResults">
				{
				searchResult.searchResult.filter(content => content.type == "artist")
				.map(artist => (
				<li key={artist.browseId}>
					<p className="artist-name">{artist.name}</p>
				</li>
				))
				}
			</ul>
		</div>
		<div className="albumResContainer">
			<h2>Albums</h2>
			<ul className="albumResults">
				{
				searchResult.searchResult.filter(content => content.type == "album")
				.map(album => (
				<li key={album.browseId}>
					<p className="album-name">{album.name}</p>
				</li>
				))
				}
			</ul>
		</div>
	</>)
}

export default SearchRender
