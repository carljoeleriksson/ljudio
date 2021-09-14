import React from 'react'

function SinglePlaylistPage() {

const playlistContent = {
	playlistName: "Playlist 1",
	songs: [
		{
			videoId: "kjv81nv",
			name: "Bohemian Rhapsody",
			artist: {
				name: "Queen"
			}
		},
		{
			videoId: "kjv81nv",
			name: "Bohemian Rhapsody",
			artist: {
				name: "Queen"
			}
		},
		{
			videoId: "kjv81nv",
			name: "Bohemian Rhapsody",
			artist: {
				name: "Queen"
			}
		},
		{
			videoId: "kjv81nv",
			name: "Bohemian Rhapsody",
			artist: {
				name: "Queen"
			}
		}
	]
}

	return (<>
		<h2>{playlistContent.name}</h2>
			<ul className="playlist-container">
				{playlistContent.songs.map(song => (
					<li key={song.videoId}>
					<p className="song-title">{song.name}</p>
					<p className="artist-name">{song.artist.name}</p>
					{/*
					<button type="button" onClick={() => playSong(song.videoId)}><FaPlayCircle /></button>
					*/}
				</li>
					//Button here
				)
				)}
			</ul>
	</>)
}

export default SinglePlaylistPage
