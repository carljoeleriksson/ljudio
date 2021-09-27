import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


const PrettoSlider = styled(Slider)({
  color: '#01A5AF',
  height: 5,
  '& .MuiSlider-track': {
    border: 'none',
    color: '#000'
  },
  '& .MuiSlider-rail': {
    color: '#000'
  },
  '& .MuiSlider-thumb': {
    height: 15,
    width: 15,
    backgroundColor: '#000',
    border: '2px solid rgba(0, 0, 0, 0.5)',
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
    const [currentTime, setCurrentTime] = useState();
    const [duration, setDuration] = useState(0);

    

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
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
     
  const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  function formatTime() {
    const time = currentTime;
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const formattedTime = `${minutes}:${padTime(seconds)}`
    
    return (formattedTime)
  }

  function formatDuration(time) {

    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const formattedTime = `${minutes}:${padTime(seconds)}`
    
    return formattedTime;
  }

  
  function videoOnPlay(event) {
    setPlayerState({
      isPlaying: true,
      player: event.target
    })
    
    console.log('Current Time On Play: ', event.target.getCurrentTime());
    setInterval(() => {
      setCurrentTime(event.target.getCurrentTime())
    }, 1000)
  }
  function videoOnPause(event) {
    setPlayerState({
      isPlaying: false,
      player: event.target
    })
  }
  
  function videoOnReady() {}

  function addDefaultThumb(e){
    e.target.src = '../assets/default-thumb.png'
  }

  return (
    
    <div className="player-wrapper">
      <YouTube 
        videoId={playerState.songPlaying.videoId} 
        opts={opts} 
        onReady={videoOnReady}
        onPlay={videoOnPlay} 
        onPause={videoOnPause} 
      />
    <div className='progress-bar-wrapper'>
      <span id='current-time'>{playerState.songPlaying ? formatTime() : '0:00'}</span>  {/**This we will set dynamically later */}
      <PrettoSlider id='progress-bar' min={0} max={70} defaultValue={20} />
      <span id='duration'>{playerState.songPlaying ? formatDuration(playerState.songPlaying.duration / 1000) : '0:00'}</span> 
    </div>  

    <div className="song-playing-details">
        <span className="player-title">{playerState.songPlaying ? playerState.songPlaying.name : "---"}</span>
        <span className="player-artist">{playerState.songPlaying ? playerState.songPlaying.artist.name : "---"}</span>
        <img className="player-thumb" src={playerState.songPlaying && playerState.songPlaying.thumbnails[1].url} onError={addDefaultThumb} />
    </div>

    <div className="controls-wrapper">
        <button className="previous-btn"><FaStepBackward /></button>
        <button className="play-pause-btn" onClick={playPause}>{playerState.isPlaying ? <FaPause /> : <FaPlay />}</button>
        <button className="next-btn"><FaStepForward /></button>
    </div>   

  </div>);
  
}
