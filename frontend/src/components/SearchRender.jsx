import React, { useContext, useState, createContext, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle, FaPlus } from 'react-icons/fa';
import Player from '../components/Player';
import PlaylistModal from '../components/PlaylistModal';

export const Context = createContext();

import { PlayerContext } from '../contexts/PlayerContext';


function SearchRender(result) {




   
   if(result.result){
   const searchResult = result.result;
   
   const [ playerState, updatePlayerState ] = useContext(PlayerContext)
   


   const [showContext, setShowContext] = useState(false);

   const [songPlaying, setSongPlaying] = useState('');
   const [addSong, setAddSong] = useState();

   function playPause(songObj) {
      if(playerState.isPlaying && playerState.songPlaying.videoId === songObj.videoId){
         updatePlayerState({
            isPlaying: false
         })
         playerState.player && playerState.player.pauseVideo()
      } else {
         updatePlayerState({
            isPlaying: true,
            songPlaying: songObj
         }) 
         playerState.player && playerState.player.playVideo()
      } 
   }

   function addToPlaylist(songObj) {
      console.log('songObj i searchrender', songObj);
      setAddSong(songObj);
      setShowContext(true);
   }

   function playSong(videoId) {
      console.log(videoId);
      setSongPlaying(videoId);
   }
   
  function playAplaylist() {
   let arr = []
   let songs = []
   searchResult.filter((content) => content.type == 'song')
      .map((song) => {
         console.log(song)
         arr.push(song.videoId)
         songs.push(song)
      })

   updatePlayerState({
      isPlaying: true,
      playlist: songs,
      songPlaying: songs[0],
      playedSongIndex: 0,
      playlistVideoIds: arr

   })
}

    useEffect(() => {
      console.log("Play a playlist:")
      playAplaylist()
   }, [searchResult]);
   
   function addDefaultThumb(e){
      e.target.src = '../assets/default-thumb.png'
    }

   return (
      <Context.Provider value={[showContext, setShowContext]}>
         {songPlaying !== '' && <Player videoId={songPlaying} />}
         {addSong !== undefined && <PlaylistModal {...addSong} />}
      <div className="search-result-wrapper">
         <div className="song-result-container">
            <h2>Songs</h2>
            <ul className="song-list">
               {searchResult
                  .filter((content) => content.type == 'song')
                  .map((song) => (
                     <li className="search-li" key={song.videoId}>
                        <img className="thumb-li" src={song.thumbnails[0].url} onError={addDefaultThumb} />
                        <span className="song-title-li">{song.name}</span>
                        <span className="artist-name-li">{song.artist.name}</span>
                        <button 
                           className="play-pause-li-btn icon-btn" 
                           type="button" 
                           onClick={() => playPause(song)}>
                              {playerState.isPlaying && playerState.songPlaying.videoId === song.videoId ?  <FaPauseCircle /> : <FaPlayCircle />}
                        </button>
                        <button
                           className="add-to-playlist-li-btn icon-btn"
                           type="button"
                           onClick={() => {addToPlaylist(song)}}>
                              <FaPlus />
                        </button>
                     </li>
                  ))}
            </ul>
         </div>
      </div>
      </Context.Provider>
   );
} else {
   return(<></>)
}
}

export default SearchRender;