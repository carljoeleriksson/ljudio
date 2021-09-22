import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap/';


function Playlists() {
   function getToken() {
      return sessionStorage.getItem('auth');
   }
   const [playlists, setPlaylists] = useState({});
   const [error, setError] = useState()

   const history = useHistory();

   async function getPlaylistsDb() {
      const TokenKey = getToken();
      const response = await fetch('/api/browse_playlists', {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();
      console.log(data);

      if (data.length > 0) {
         setPlaylists(data);
      } else if (data.error) {
         setError(data.message)
      }

   }

   function goToSinglePlaylist(id, playlistName) {
      console.log(id)
      history.push({
         pathname: '/singlePlaylistPage/' + id,
         // search: id,
         state: { playlistId: id, playlistName: playlistName }
      });
   }

   async function deletePlaylist(e, playlistId) {
      e.preventDefault()
      const TokenKey = getToken();
      const response = await fetch(`/api/delete_playlist/${playlistId}`, {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();
      console.log(data);


      if (data.changes > 0) {
         var element = e.target.parentNode
         element.parentNode.removeChild(element);
      } else if (data.error) {
         setError(data.message)
      }

      // setPlaylists(data);
      // console.log(data);
   }


   console.log('playlists from PLAYLISTS', playlists);
   useEffect(() => {
      getPlaylistsDb();
   }, []);

   return (
      <ul>
         {/* If you put playlists == {} you can search songs */}
         {playlists.length > 0 &&
            playlists.map((playlist) => (
               <li key={playlist.Id} value={playlist.Id}>

                  <div key={playlist.Id} value={playlist.Id}
                     onClick={() => goToSinglePlaylist(playlist.Id, playlist.Name)}>       {playlist.Name} </div>

                  <Button
                     variant="primary" size="sm"
                     onClick={(e) => {
                        deletePlaylist(e, playlist.Id);
                     }}
                  >
                     Delete
                  </Button>

               </li>


            )
            )}
         {error != undefined && error}

      </ul>
   );
}

export default Playlists;
