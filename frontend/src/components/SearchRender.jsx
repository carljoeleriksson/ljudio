import React, { useContext, useState, createContext, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { IoAddCircleSharp } from 'react-icons/io5';
import Player from '../components/Player';
import PlaylistModal from '../components/PlaylistModal';

export const Context = createContext();

import { PlayerContext } from '../contexts/PlayerContext';

function SearchRender(result) {
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

   // useEffect(() => {
   //    getPlayListDb();
   // }, []);

   return (
      <Context.Provider value={[showContext, setShowContext]}>
         {songPlaying !== '' && <Player videoId={songPlaying} />}
         {addSong !== undefined && <PlaylistModal {...addSong} />}

         <div className="song-result-container">
            <h2>Songs</h2>
            <ul className="song-list">
               {searchResult
                  .filter((content) => content.type == 'song')
                  .map((song) => (
                     <li key={song.videoId}>
                        <p className="song-title">{song.name}</p>
                        <p className="artist-name">{song.artist.name}</p>
                        <button type="button" onClick={() => playPause(song)}>
                           {playerState.isPlaying && playerState.songPlaying.videoId === song.videoId ?  <FaPauseCircle /> : <FaPlayCircle />}
                        </button>
                        <button
                           type="button"
                           onClick={() => {
                              addToPlaylist(song);
                           }}
                        >
                           <IoAddCircleSharp />
                        </button>
                     </li>
                  ))}
            </ul>
         </div>

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

         {/* HERE, we might put a div with playlist-results later */}
      </Context.Provider>
   );
}

export default SearchRender;
