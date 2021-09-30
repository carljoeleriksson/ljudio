import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';
import { ProgressBar } from 'react-bootstrap';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';




export default function Player(props) {
  const [playerState, setPlayerState] = useContext(PlayerContext)
  const [currentTime, setCurrentTime] = useState();
  const [duration, setDuration] = useState(0);
  const [progressBar, setProgressBar] = useState(0);



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



  function playPause() {
    if (playerState.isPlaying == true) {
      playerState.player.pauseVideo()
      setPlayerState({
        isPlaying: false
      })

    } else if (playerState.isPlaying == false) {
      playerState.player.playVideo()
      setPlayerState({
        isPlaying: true
      })
    }
  }

  function playNext(){
    //console.log("Play next:")
    playerState.playlist.map((el, index) => {
      if (el.videoId == playerState.songPlaying.videoId) {
        let currentVideoId = ++index
        if (currentVideoId < playerState.playlist.length) {
          console.log(playerState.playlist[currentVideoId])
          setPlayerState({
            isPlaying: true,
            songPlaying: playerState.playlist[currentVideoId]
          })
        }
      }
    })
  }

  function playBack (){
    //console.log("Play back:")
    playerState.playlist.map((el, index) => {
      if (el.videoId == playerState.songPlaying.videoId) {
        let currentVideoId = --index
        if (currentVideoId < playerState.playlist.length && currentVideoId >= 0) {
          console.log(playerState.playlist[currentVideoId])
          setPlayerState({
            isPlaying: true,
            songPlaying: playerState.playlist[currentVideoId]
          })
        }
      }
    })
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
      //   songPlaying: event.target
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


  function videoOnReady(event) {
    console.log("videoOnReady")
    setPlayerState({
      player: event.target
    })
    console.log("playlistVideoIds:")

    console.log(playerState.playlistVideoIds)
    event.target.loadPlaylist(
      {
        playlist: playerState.playlistVideoIds
      }
      ,
      3)
  }

  function addDefaultThumb(e) {
    e.target.src = '../assets/default-thumb.png'
  }

  function onPlayerStateChange(event) {
    // console.log(event)
    // console.log(playerState.isPlaying)
    var progress_bar = null
    if (playerState.isPlaying === true) {
      // $('#progressBar').show();


      //progress_interval(playerTotalTime, playerCurrentTime)
      progress_bar = setInterval(function () {
        //   console.log("playerCurrentTime: "+ playerCurrentTime)

        var playerTotalTime = event.target.getDuration()

        //console.log("playerTotalTime: "+ playerTotalTime)

        var playerCurrentTime = event.target.getCurrentTime();

        var playingPercentage = (playerCurrentTime / playerTotalTime) * 100;

        // console.log("playerTimeDifference: "+ playingPercentage)                 

        setProgressBar(playingPercentage)


      }, 1000);

    } else {

      /*  let currentVideoId = 0
        console.log("Event state:")
        console.log(event.data)
         
         if(event.data == 0){ // song play end
           console.log("Ended")
           currentVideoId++;
           if (currentVideoId < playerState.playlist.length) {
             console.log(playerState.playlist[currentVideoId])
 
             playerState.player.loadVideoById(playerState.playlist[currentVideoId]);
           }
         } */
      clearTimeout(progress_bar);


    }

    if (event.data != null && event.data === 0) {
      console.log('done');
      console.log(playerState.songPlaying.videoId)
      //let index = 0
      playerState.playlist.map((el, index) => {
        if (el.videoId == playerState.songPlaying.videoId) {
          let currentVideoId = ++index
          if (currentVideoId < playerState.playlist.length) {
            console.log(playerState.playlist[currentVideoId])
            setPlayerState({
              isPlaying: true,
              songPlaying: playerState.playlist[currentVideoId]
            })
          }
        }
      })

      //let currentVideoId = 0
      // let currentVideoId = ++playerState.playedSongIndex
      //if (currentVideoId < playerState.playlist.length) {
      //  console.log(playerState.playlist[currentVideoId])

      //  playerState.playlist map to find playlist song by event.target.videoId
      // move to next index when u found it 


      // let currentPlayingSong = playerState.playlist.filter((el) => el.videoId == playerState.playlist[currentVideoId])
      //   console.log(currentPlayingSong)
      //  playerState.player.loadVideoById(playerState.playlist[currentVideoId]);


      //   }
    }

  }
  function handlePlayMove(e) {
    console.log("handleplaymove")


    console.log(e.target.value)
    let moveRange_percenatge = e.target.value / 100
    console.log("Current Time: " + playerState.player.getCurrentTime())
    console.log("Total Time: " + playerState.player.getDuration())

    let moveInSek = moveRange_percenatge * playerState.player.getDuration()

    console.log("Move to sek: " + moveInSek)
    playerState.player.seekTo(moveInSek)
  }





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

      <div className='progress-bar-wrapper'>
        <span id='current-time'>{playerState.songPlaying && formatTime()}</span>  {/**This we will set dynamically later */}
        <PrettoSlider min={0} max={100} defaultValue={progressBar} onChange={handlePlayMove} />
        <span id='duration'>{playerState.songPlaying && formatDuration(playerState.songPlaying.duration / 1000)}</span>
      </div>
      <div className="song-playing-details">
        <span className="player-title">{playerState.songPlaying ? playerState.songPlaying.name : "---"}</span>
        <span className="player-artist">{playerState.songPlaying ? playerState.songPlaying.artist.name : "---"}</span>
        <img className="player-thumb" src={playerState.songPlaying && playerState.songPlaying.thumbnails[1].url} onError={addDefaultThumb} />
      </div>

      <div className="controls-wrapper">
        <button className="previous-btn" onClick={playBack}><FaStepBackward /></button>
        <button className="play-pause-btn" onClick={playPause}>{playerState.isPlaying ? <FaPause /> : <FaPlay />}</button>
        <button className="next-btn" onClick={playNext}><FaStepForward /></button>
      </div>

    </div>);

}
