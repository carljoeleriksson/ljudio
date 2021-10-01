import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export default function Player(props) {
   const [playerState, setPlayerState] = useContext(PlayerContext);
   const [currentTime, setCurrentTime] = useState();
   const [progressBar, setProgressBar] = useState(0);

   const PrettoSlider = styled(Slider)({
      color: '#01A5AF',
      height: 5,
      '& .MuiSlider-track': {
         border: 'none',
         color: '#000',
      },
      '& .MuiSlider-rail': {
         color: '#000',
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
         playerState.player.pauseVideo();
         setPlayerState({
            isPlaying: false,
         });
        } else if (playerState.isPlaying == false) {
          playerState.player.playVideo()
          setPlayerState({
            isPlaying: true
          })
        }
      }
      function nextSong() {
         playerState.playlist.map((el, index) => {
            if (el.videoId == playerState.songPlaying.videoId) {
               let currentVideoId = ++index;
               if (currentVideoId < playerState.playlist.length) {
                  setPlayerState({
                     isPlaying: true,
                     songPlaying: playerState.playlist[currentVideoId],
                  });
               }
            }
         });
      }
   
      function prevSong() {
         playerState.playlist.map((el, index) => {
            if (el.videoId == playerState.songPlaying.videoId) {
               let currentVideoId = --index;
               if (
                  currentVideoId < playerState.playlist.length &&
                  currentVideoId >= 0
               ) {
                  setPlayerState({
                     isPlaying: true,
                     songPlaying: playerState.playlist[currentVideoId],
                  });
               }
            }
         });
      }

   const opts = {
      height: '0',
      width: '0',
      playerVars: {
         autoplay: 1,
      },
   };

   const padTime = (time) => {
      return String(time).length === 1 ? `0${time}` : `${time}`;
   };

   function formatTime() {
      const time = currentTime;
      if (currentTime) {
         const minutes = Math.floor(time / 60);
         const seconds = Math.round(time % 60);
         const formattedTime = `${minutes}:${padTime(seconds)}`;

         return formattedTime;
      } else {
         return '0:00';
      }
   }

   function formatDuration(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);
      const formattedTime = `${minutes}:${padTime(seconds)}`;

      return formattedTime;
   }

   function videoOnPlay(event) {
      setPlayerState({
         isPlaying: true,
         player: event.target,
      });

      setInterval(() => {
         setCurrentTime(event.target.getCurrentTime());
      }, 1000);
   }

   function videoOnPause(event) {
      setPlayerState({
         isPlaying: false,
         player: event.target,
      });
   }

   function videoOnReady(event) {
    setPlayerState({
      player: event.target
    })

    event.target.loadPlaylist(
      {
        playlist: playerState.playlistVideoIds
      }, 3)
  }

   function addDefaultThumb(e) {
      e.target.src = '../assets/default-thumb.png';
   }

   function onPlayerStateChange(event) {
      var progress_bar = null;
      if (playerState.isPlaying === true) {
         progress_bar = setInterval(function () {
            var playerTotalTime = event.target.getDuration();
            var playerCurrentTime = event.target.getCurrentTime();
            var playingPercentage = (playerCurrentTime / playerTotalTime) * 100;

            if (playingPercentage >= 0) {
               setProgressBar(playingPercentage);
            }
         }, 1000);
      } else {
         clearTimeout(progress_bar);
      }

      if (event.data != null && event.data === 0) {
         playerState.playlist.map((el, index) => {
            if (el.videoId == playerState.songPlaying.videoId) {
               let currentVideoId = ++index;
               if (currentVideoId < playerState.playlist.length) {
                  setPlayerState({
                     isPlaying: true,
                     songPlaying: playerState.playlist[currentVideoId],
                  });
               }
            }
         });
      }
   }

   function handlePlayMove(e) {
      let moveRange_percenatge = e.target.value / 100;
      let moveInSek = moveRange_percenatge * playerState.player.getDuration();

      playerState.player.seekTo(moveInSek);
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

         <div className="progress-bar-wrapper">
            <span id="current-time">{playerState.songPlaying && formatTime()}</span>{' '}
            <PrettoSlider
               min={0}
               max={100}
               value={progressBar}
               onChange={handlePlayMove}
            />
            <span id="duration">
               {playerState.songPlaying &&
                  formatDuration(playerState.songPlaying.duration / 1000)}
            </span>
         </div>
         <div className="song-playing-details">
            <span className="player-title">
               {playerState.songPlaying ? playerState.songPlaying.name : '---'}
            </span>
            <span className="player-artist">
               {playerState.songPlaying
                  ? playerState.songPlaying.artist.name
                  : '---'}
            </span>
            <img
               className="player-thumb"
               src={
                  playerState.songPlaying &&
                  playerState.songPlaying.thumbnails[1].url
               }
               onError={addDefaultThumb}
            />
         </div>

         <div className="controls-wrapper">
            <button onClick={prevSong} className="previous-btn">
               <FaStepBackward />
            </button>
            <button className="play-pause-btn" onClick={playPause}>
               {playerState.isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={nextSong} className="next-btn">
               <FaStepForward />
            </button>
         </div>
      </div>
   );
}
