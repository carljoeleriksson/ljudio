import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap/';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import * as QueryString from "query-string"
import IsLoggedIn from '../components/IsLoggedIn';




function SinglePlaylistPage(props) {
   const [playlistContent, setPlaylistContent] = useState([])
   const [error, setError] = useState()
   const [sharelink, setSharelink] = useState()
   const url = window.location.href
   //const playlistId = props.location.state.playlistId
   console.log(props.location.search)
   const params = QueryString.parse(props.location.search);
   console.log(params.playlistId);
   console.log(params.playlistName);

   const playlistId = params.playlistId
   const playlistName = params.playlistName

   const sharing_code = params.code !== undefined ? params.code : null



   //This is the fetch that we're gonna use once we can connecto to backend.
   function getToken() {
      return sessionStorage.getItem('auth');
   }

   async function getSinglePlaylist() {
      const TokenKey = getToken()
      const response = await fetch(`/api/fetch_playlist/${playlistId}`,
         { headers: { Authorization: `Bearer ${TokenKey}` }, });
      const data = await response.json();
      console.log('getPlaylists data ', data);
      if (data.length > 0) {

         setPlaylistContent(data);

      } else if (data.error) {
         setError(data.message)

      }


   }
   async function getSharedPlaylist(code) {
      const TokenKey = getToken()
      const response = await fetch(`/api/fetch_shared_playlist/${code}`);
      const data = await response.json();
      console.log('get shared Playlists data ', data);
      if (data.length > 0) {

         setPlaylistContent(data);

      } else if (data.error) {
         setError(data.message)

      }


   }
   async function deleteFromPlaylist(e, contentId) {
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

      } else if (data.error) {
         setError(data.message)

      }


   }

   async function sharePlaylist(e) {
      e.preventDefault()
      console.log('Delete from Playlist#ID:' + playlistId)
      const TokenKey = getToken()
      const response = await fetch(`/api/share_playlist/${playlistId}`,
         { headers: { Authorization: `Bearer ${TokenKey}` }, });
      const data = await response.json();
      console.log('Share response: ', data);
      if (data.error) {
         setError(data.message)

      } else if (data) {
         console.log("Share code" + data)
         setSharelink(url + '&code=' + data)

      }


   }
   useEffect(() => {
      if (!sharing_code) {
         getSinglePlaylist()
      } else {
         getSharedPlaylist(sharing_code)
      }
   }, [])


   return (
      <>
        {!sharing_code &&  <IsLoggedIn/>}

         <h2>{playlistName}</h2>

         {!sharing_code &&
            <Button
               variant="primary" size="sm"
               onClick={(e) => {
                  sharePlaylist(e);
               }}
            >
               Share this playlist
            </Button>}
         {sharelink &&
            <CopyToClipboard text={sharelink}>
               <button>Copy URL to the clipboard</button>
            </CopyToClipboard>}
         <ul className="playlist-container">
            {playlistContent.length > 0 && playlistContent.map((el) => (

               <li id={el.Id} value={el.Content.videoId} key={el.Content.videoId}>

                  <p className="song-title">{el.Content.name}</p>
                  <p className="artist-name">{el.Content.artist.name}</p>
                  {!sharing_code && <Button
                     variant="primary" size="sm"
                     onClick={(e) => {
                        deleteFromPlaylist(e, el.Id);
                     }}
                  >
                     Delete
                  </Button>
                  }
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
