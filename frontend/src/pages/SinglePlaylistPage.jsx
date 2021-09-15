import React from 'react'

function SinglePlaylistPage(playlistId) {
	//This is the fetch that we're gonna use once we can connecto to backend.

	async function getSinglePlaylist() {
		const response = await fetch(`/api/fetch_playlist_content/${playlistId}`)
		const data = await response.json();

		if (data) {
			console.log('getPlaylistDb if', data);
		} else {
			console.log('getPlaylistDb else',data);
		}
		console.log("getPlaylists data ", data);

		setPlaylists(data);
	}

	//Dummy data below!
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
