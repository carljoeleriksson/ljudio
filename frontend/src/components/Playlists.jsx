import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { GeneralContext } from '../pages/HomePage';

function Playlists() {
   const [playlistsCxt, setPlaylistsCxt] = useContext(GeneralContext);

   function getToken() {
      return sessionStorage.getItem('auth');
   }
   const [playlists, setPlaylists] = useState({});
   const [error, setError] = useState();

   const history = useHistory();

   async function getPlaylistsDb() {
      const TokenKey = getToken();
      const response = await fetch('/api/browse_playlists', {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();

      if (data.length > 0) {
         setPlaylists(data);
      } else if (data.error) {
         setError(data.message);
      }
   }

   async function deletePlaylist(e, playlistId) {
      e.preventDefault();
      const TokenKey = getToken();
      const response = await fetch(`/api/delete_playlist/${playlistId}`, {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();

      if (data.changes > 0) {
         document.getElementById(playlistId).remove();
      } else if (data.error) {
         setError(data.message);
      }
   }

   useEffect(() => {
      getPlaylistsDb();
   }, [playlistsCxt]);

   return (
      <ul className="playlists-ul song-list">
         {playlists.length > 0 &&
            playlists.map((playlist) => (
               <li
                  className="playlists-li"
                  id={playlist.Id}
                  key={playlist.Id}
                  value={playlist.Id}
               >
                  <Link
                     to={
                        '/singlePlaylistPage?playlistId=' +
                        playlist.Id +
                        '&playlistName=' +
                        playlist.Name
                     }
                  >
                     {playlist.Name}
                  </Link>
                  <button
                     className="delete-btn icon-btn"
                     variant="primary"
                     size="sm"
                     onClick={(e) => {
                        window.confirm('Your sure you want to delete this item') &&
                           deletePlaylist(e, playlist.Id);
                     }}
                  >
                     <FaTrashAlt />
                  </button>
                  <hr></hr>
               </li>
            ))}
         {error != undefined && error}
      </ul>
   );
}

export default Playlists;
