import React, { useContext, useState, createContext, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle, FaPlus } from 'react-icons/fa';
import Player from '../components/Player';
import PlaylistModal from '../components/PlaylistModal';

import { PlayerContext } from '../contexts/PlayerContext';
import { SearchContext } from '../contexts/SearchContext';

export const ModalContext = createContext();

function SearchRender() {
   const  { searchState } = useContext(SearchContext)
   const searchResult = searchState.searchResult
   console.log('searchState.searchResult', searchResult);

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

  // play a list of songs
  // to be called later
  function playAplaylist() {
   //playerState.playlist = arr
   // arr.forEach(element => {
   let arr = []
   let songs = []
   
   if(searchResult){
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
      //console.log("Play a playlist:")
      playAplaylist()
   }, [searchResult]);
   
   function addDefaultThumb(e){
      e.target.src = '../assets/default-thumb.png'
    }

   return (
      <ModalContext.Provider value={[showContext, setShowContext]}>
         {songPlaying !== '' && <Player videoId={songPlaying} />}
         {addSong !== undefined && <PlaylistModal {...addSong} />}

      {!searchResult ? 
      <div className="search-result-wrapper">
         <div className="song-result-container">
            <h3>Found nothing!</h3>
            <h5>Try searching for something else.</h5>
         </div>
      </div>
      
      :

      <div className="search-result-wrapper">
         <div className="song-result-container">
            <h2>Songs</h2>
            <ul className="song-list">
               {searchState.searchResult
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
      }
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
      </ModalContext.Provider>
   );
}

export default SearchRender;