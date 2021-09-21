import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap/';

function SinglePlaylistPage(playlistHistory) {
   const [playlistContent, setPlaylistContent, error, setError] = useState({})
   //This is the fetch that we're gonna use once we can connecto to backend.
   function getToken() {
      return sessionStorage.getItem('auth');
   }

   async function getSinglePlaylist() {
      const TokenKey = getToken()
      const playlistId = playlistHistory.location.state.playlistId
      const response = await fetch(`/api/fetch_playlist/${playlistId}`,
         { headers: { Authorization: `Bearer ${TokenKey}` }, });
      const data = await response.json();
      console.log('getPlaylists data ', data);
      if (data.length > 0) {

         setPlaylistContent(data);

      } else if (data.Error) {
         setError(data.message)

      }


   }
   async function deleteFromPlaylist(e, contentId, playlistId) {
      e.preventDefault()
      console.log('Delete Content#ID:' + contentId)
      console.log('Delete from Playlist#ID:' + playlistId)
      const TokenKey = getToken()
      const response = await fetch(`/api/delete_from_playlist/playlist/${playlistId}/contentid/${contentId}`,
         { headers: { Authorization: `Bearer ${TokenKey}` }, });
      const data = await response.json();
      console.log('Delete response: ', data);
      if (data.changes > 0) {
         var element = e.target.parentNode
         element.parentNode.removeChild(element);

      } else if (data.Error) {
         setError(data.message)

      }


   }
   useEffect(() => {

      getSinglePlaylist()

   }, [])


   return (
      <>
         <h2>{playlistHistory.location.state.playlistName}</h2>
         <ul className="playlist-container">
            {playlistContent.length > 0 && playlistContent.map((el) => (

               <li id={el.Id} value={el.Content.videoId} key={el.Id}>

                  <p className="song-title">{el.Content.name}</p>
                  <p className="artist-name">{el.Content.artist.name}</p>
                  <Button
                     variant="primary" size="sm"
                     onClick={(e) => {
                        deleteFromPlaylist(e, el.Id, el.Playlist_id);
                     }}
                  >
                     Delete
                  </Button>
                  {/*
					<button type="button" onClick={() => playSong(song.videoId)}><FaPlayCircle /></button>
					*/}
               </li>
               //Button here

            ))}
         </ul>
         {error != undefined && error}
      </>
   );
}

export default SinglePlaylistPage;
