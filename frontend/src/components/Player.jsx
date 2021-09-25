import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';
import { ProgressBar } from 'react-bootstrap';




export default function Player(props) {
    const [playerState, setPlayerState] = useContext(PlayerContext)
    const [currentTime, setCurrentTime] = useState();
    const [duration, setDuration] = useState(0);
    const [progressBar, setProgressBar] = useState(0);


    

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

  // play a list of songs
  // to be called later
  function playAplaylist(){
    playerState.player.loadVideoById({'videoId': playerState.songPlaying.videoId,
    'startSeconds': 5,
    'endSeconds': 60})
  }
  
  function videoOnReady() {}


  function progress_interval(playerTotalTime, playerCurrentTime){
   return setInterval(function() {
  //   console.log("playerCurrentTime: "+ playerCurrentTime)

     
     var playingPercentage = (playerCurrentTime / playerTotalTime) * 100;

    // console.log("playerTimeDifference: "+ playingPercentage)                 


     setProgressBar(playingPercentage)


   }, 1000);        
 }
  
  function onPlayerStateChange(event) {
   // console.log(event)
  // console.log(playerState.isPlaying)
  var progress_bar = null
      if(playerState.isPlaying === true){
       // $('#progressBar').show();
        

        //progress_interval(playerTotalTime, playerCurrentTime)
         progress_bar = setInterval(function() {
          //   console.log("playerCurrentTime: "+ playerCurrentTime)
        
          var playerTotalTime = event.target.getDuration()

          //console.log("playerTotalTime: "+ playerTotalTime)
  
          var playerCurrentTime = event.target.getCurrentTime();
          
             var playingPercentage = (playerCurrentTime / playerTotalTime) * 100;
        
            // console.log("playerTimeDifference: "+ playingPercentage)                 
        
        
             setProgressBar(playingPercentage)
        
        
           }, 1000);    

     } else {
        
        clearTimeout(progress_bar);
      //  $('#progressBar').hide();
      }
    
  }

      
    /*
      if (event.data == playerState.PlayerState.PLAYING) {
  
        $('#progressBar').show();
        var playerTotalTime = playerState.player.getDuration();
  
        mytimer = setInterval(function() {
          var playerCurrentTime = playerState.player.getCurrentTime();
  
          var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
  
  
          progress(playerTimeDifference, $('#progressBar'));
        }, 1000);        
      } else {
        
        clearTimeout(mytimer);
        $('#progressBar').hide();
      }
      */
  
  

  return (
    
    <div className="player-wrapper">
      <YouTube 
        videoId={playerState.songPlaying.videoId} 
        opts={opts} 
        onReady={videoOnReady}
        onPlay={videoOnPlay} 
        onPause={videoOnPause} 
        onStateChange={onPlayerStateChange}
      />
      
    <span id='current-time'>{playerState.songPlaying && formatTime()}</span>  {/**This we will set dynamically later */}
    {/** <PrettoSlider min={50} max={70} defaultValue={20} />
    <div id="progressBar" className="progressBar" >
     <div>{progressBar}</div>
    </div>
     */}
     <ProgressBar now={progressBar} />
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
