import React, { useState, createContext } from 'react';

export const PlayerContext = createContext();

function PlayerContextProvider(props) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    songPlaying: '', //pass in the whole song object.
    player: '', //this is the event.target from the player so we can call methods on the player (as .playVideo())
  });

  function updatePlayerState(updates) {
    setPlayerState({
      ...playerState,
      ...updates,
    });
  }
  console.log('PlayerContext playerState: ', playerState);

  return (
    <div>
      <PlayerContext.Provider value={[playerState, updatePlayerState]}>
        {props.children}
      </PlayerContext.Provider>
    </div>
  );
}

export default PlayerContextProvider;
