import React, { useContext } from 'react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { PlayerContext } from '../contexts/PlayerContext';

function SearchRender(result) {
   //Getting prop (result) as object form some reason, so I redirect to the array that it contains.
   const searchResult = result.result;

   const [ playerState, updatePlayerState ] = useContext(PlayerContext)

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

   return (
      <>
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
      </>
   );
}

export default SearchRender;
