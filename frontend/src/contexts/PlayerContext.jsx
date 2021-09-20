import React, { useState, createContext } from 'react'

export const PlayerContext = createContext();

function PlayerContextProvider(props) {
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		songPlaying: '' //pass in the whole song object.
		})

		function updatePlayerState(updates) {
			setPlayerState({
				...playerState,
				...updates
			})
		}
	console.log(playerState);

	return (
		<div>
			<PlayerContext.Provider value={[playerState, updatePlayerState]}>
				{props.children}
			</PlayerContext.Provider>
		</div>
	)
}


export default PlayerContextProvider
