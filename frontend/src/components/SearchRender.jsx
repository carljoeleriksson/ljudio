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
   // const [getPlaylist, setGetplaylist] = useState({});

   function playPause(songObj) {
      //{playerState.isPlaying && playerState.songPlaying.videoId === song.videoId ?  <FaPauseCircle /> : <FaPlayCircle />}
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
  // play a list of songs
  // to be called later
  function playAplaylist(){
   //playerState.playlist = arr
  // arr.forEach(element => {
let arr = []
let songs = []
      console.log(arr)
      searchResult.filter((content) => content.type == 'song')
    .map((song) => {
       console.log(song)
       arr.push(song.videoId)
       songs.push(song)


    })
    updatePlayerState({
      isPlaying: true,
      playlist: songs,
      songPlaying:songs[0],
      playedSongIndex:0
   })
   // setPlayerState({
      // songPlaying: 
     // }) 
  console.log(arr)

  // playerState.songPlaying.videoId = 'e1FN047_LT0'
  const oo = playerState.player.loadPlaylist(
      { playlist:arr
     }
      ,
   3)
   console.log("Auto Paylist")

  console.log(arr[0])

  //playerState.player.loadVideoById(arr[0]);


  
}     
  
 
   // function getToken() {
   //    return sessionStorage.getItem('auth');
   // }

   // async function getPlayListDb() {
   //    const TokenKey = getToken();
   //    const response = await fetch('/api/browse_playlists', {
   //       headers: { Authorization: `Bearer ${TokenKey}` },
   //    });

   //    const data = await response.json();
   //    if (data) {
   //       setGetplaylist(data);

   //       console.log(('GETPLAYLIST FROM SEARCHANDRENDER', getPlaylist));
   //    }
   // }

    useEffect(() => {
      console.log("Play a playlist:")
      playAplaylist()
   }, []);
   // useEffect(() => {
   //    getPlayListDb();
   // }, []);
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
                     <li key={song.videoId}>
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
{/* 
         <div className="artist-result-container">
            <h2>Artists</h2>
            <ul className="artist-list">
               {searchResult.length > 0 &&
                  searchResult
                     .filter((content) => content.type == 'artist')
                     .map((artist) => (
                        <li key={artist.browseId}>
                           <p className="artist-name">{artist.name}</p>
                        </li>
                     ))}
            </ul>
         </div>
         <div className="album-result-container">
            <h2>Albums</h2>
            <ul className="album-list">
               {searchResult.length > 0 &&
                  searchResult
                     .filter((content) => content.type == 'album')
                     .map((album) => (
                        <li key={album.browseId}>
                           <p className="album-name">{album.name}</p>
                        </li>
                     ))}
            </ul>
         </div>
         */}

         {/* HERE, we might put a div with playlist-results later */}
      </Context.Provider>
   );
} else {
   return(<></>)
}
}

export default SearchRender;
