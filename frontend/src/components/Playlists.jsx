import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

function Playlists() {
	//const [playlists, setPlaylists] = useState("")
	const [redirect, setRedirect] = useState(false);

	const playlists = [ //This is just dummy-data, use the line above instead
		"playlist 1", 
		"playlist 2", 
		"playlist 3", 
		"playlist 4", 
		"playlist 5", 
		"playlist 6", 
		"playlist 7", 
		"playlist 8"
	]

	async function getPlaylistsDb() {
		const response = await fetch('/api/getAllPlaylists')
		const data = await response.json();

		if (data) {
			console.log(data.success);
		} else {
			console.log(data.success);
		}

		setPlaylists(data);
	}
	
	if (redirect) {
		return <Redirect to="/singleplaylistpage" />;
	}
	 
	//getPlaylistsDb()

	return (
		<ul>
			{playlists.map(playlist => (
					<li 
						value={playlist} 
						key={playlist} 
						onClick={() => setRedirect(true)}
						>{playlist}</li>
				))}
		</ul>
	)
}

export default Playlists
