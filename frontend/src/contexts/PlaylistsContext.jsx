// CONTEXT USED FOR THE BURGER MENU
import React, { useState, createContext } from 'react'

export const PlaylistsContext = createContext();

function PlaylistsContextProvider(props) {
	const [playlists, setPlaylists] = useState([])

	return (
		<div>
			<PlaylistsContext.Provider value={[playlists, setPlaylists]}>
				{props.children}
			</PlaylistsContext.Provider>
		</div>
	)
}

export default PlaylistsContextProvider
