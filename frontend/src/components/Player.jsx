import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


const PrettoSlider = styled(Slider)({
  color: '#01A5AF',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export default function Player(props) {
    const [playerState, setPlayerState] = useContext(PlayerContext)

    console.log('Player Component playerState', playerState);
    console.log('Player Component playerState.videoId', playerState.songPlaying.videoId);
    
    function playPause() {
      if(playerState.isPlaying == true){
        setPlayerState({
          isPlaying: false
        })

      } else if (playerState.isPlaying == false){
        setPlayerState({
          isPlaying: true
        })
      }
    }

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

  function videoOnPlay() {
    setPlayerState({
      isPlaying: true
    })
  }
  function videoOnPause() {
    setPlayerState({
      isPlaying: false
    })
  }

  return (

    <div className="player-wrapper">
      <YouTube 
        videoId={playerState.songPlaying.videoId} 
        opts={opts}
        onPlay={videoOnPlay}
        onPause={videoOnPause}
      />
    <PrettoSlider min={0} max={100} defaultValue={20} />
    <div className="song-playing-details">
        <h5 className="player-title">{playerState.songPlaying ? playerState.songPlaying.name : "---"}</h5>
        <h6 className="player-artist">{playerState.songPlaying ? playerState.songPlaying.artist.name : "---"}</h6>
        <img className="player-thumb" url={playerState.songPlaying ? playerState.songPlaying.thumbnails[1].url : ""}></img>
    </div>
    <div className="controls-wrapper">
        <button className="previous-btn"><FaStepBackward /></button>
        <button className="play-pause-btn" onClick={playPause}>{playerState.isPlaying ? <FaPause /> : <FaPlay />}</button>
        <button className="next-btn"><FaStepForward /></button>
    </div>   
  </div>);

 
}