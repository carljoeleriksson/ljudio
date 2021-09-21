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
    const [videoDuration, setVideoDuration] = useState('');

    

    function playPause() {
      if(playerState.isPlaying == true){
        playerState.player.pauseVideo()
        setPlayerState({
          isPlaying: false
        })

      } else if (playerState.isPlaying == false){
        playerState.player.playVideo()
        setPlayerState({
          isPlaying: true
        })
      }
    }

    const padTime = time => {
      return String(time).length === 1 ? `0${time}` : `${time}`;
    };

    
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

  function videoOnPlay(event) {
    setPlayerState({
      isPlaying: true,
      player: event.target
    })
  }
  function videoOnPause(event) {
    setPlayerState({
      isPlaying: false,
      player: event.target
    })
  }
  
  function formatDuration(props) {
    const time = props / 1000;
    console.log('unformatted time', time);
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const formattedDuration = `${minutes}:${seconds}`
    console.log('TIME:', formattedDuration);
    
    return (formattedDuration)
  }

  function videoOnReady() {
      //console.log('playerState.player', playerState.player);

      //formatDuration(playerState.player.getDuration());
  }

  return (
    
    <div className="player-wrapper">
      <YouTube 
        videoId={playerState.songPlaying.videoId} 
        opts={opts} 
        onReady={videoOnReady}
        onPlay={videoOnPlay} 
        onPause={videoOnPause} />
    <span>{playerState.songPlaying && playerState.player.getCurrentTime()}</span>  {/**This we will set dynamically later */}
    <PrettoSlider min={0} max={70} defaultValue={20} />
    <span>{playerState.songPlaying && formatDuration(playerState.songPlaying.duration)}</span> 
    <div className="song-playing-details">
        <h5 className="player-title">{playerState.songPlaying ? playerState.songPlaying.name : "---"}</h5>
        <h6 className="player-artist">{playerState.songPlaying ? playerState.songPlaying.artist.name : "---"}</h6>
        <img className="player-thumb" src={playerState.songPlaying ? playerState.songPlaying.thumbnails[1].url : ''} />
        
    </div>
    <div className="controls-wrapper">
        <button className="previous-btn"><FaStepBackward /></button>
        <button className="play-pause-btn" onClick={playPause}>{playerState.isPlaying ? <FaPause /> : <FaPlay />}</button>
        <button className="next-btn"><FaStepForward /></button>
    </div>   
  </div>);
  
}