<<<<<<< HEAD
import React from 'react';

=======
import React, { useContext, useState } from 'react';
>>>>>>> 6a044e2dcd46ab80135d7ddd0541e0b6559b6a6c
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
<<<<<<< HEAD
   const videoId = props.videoId;

   const opts = {
      height: '390',
      width: '640',
      playerVars: {
         // https://developers.google.com/youtube/player_parameters
         autoplay: 0,
      },
   };
   const _onReady = (event) => {
      // access to player in all event handlers via event.target
      //  event.target.pauseVideo();
   };

   return (
      //""2g811Eo7K8U"
      videoId && <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
   );
}
=======
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
    const formattedTime = `${minutes} : ${padTime(seconds)}`
    
    return (formattedTime)
  }

  function formatDuration(time) {

    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const formattedTime = `${minutes} : ${padTime(seconds)}`
    
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

  return (
    
    <div className="player-wrapper">
      <YouTube 
        videoId={playerState.songPlaying.videoId} 
        opts={opts} 
        onReady={videoOnReady}
        onPlay={videoOnPlay} 
        onPause={videoOnPause} 
      />
      
    <span id='current-time'>{playerState.songPlaying && formatTime()}</span>  {/**This we will set dynamically later */}
    <PrettoSlider min={0} max={70} defaultValue={20} />
    <span>{playerState.songPlaying && formatDuration(playerState.songPlaying.duration / 1000)}</span> 
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
>>>>>>> 6a044e2dcd46ab80135d7ddd0541e0b6559b6a6c
