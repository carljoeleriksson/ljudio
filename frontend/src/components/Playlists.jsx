import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function Playlists() {
   function getToken() {
      return sessionStorage.getItem('auth');
   }
   const [playlists, setPlaylists] = useState({});
   //const [redirect, setRedirect] = useState(false);
   const history = useHistory();

   //    const playlists = [
   //       //This is just dummy-data, use the line above instead
   //       'playlist 1',
   //       'playlist 2',
   //       'playlist 3',
   //       'playlist 4',
   //       'playlist 5',
   //       'playlist 6',
   //       'playlist 7',
   //       'playlist 8',
   //    ];

   async function getPlaylistsDb() {
      const TokenKey = getToken();
      const response = await fetch('/api/browse_playlists', {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();

      if (data) {
         console.log(data);
      } else {
         console.log(data);
      }

      setPlaylists(data);
      console.log(data);
   }

   function goToSinglePlaylist(id) {
      history.push('/singlePlaylistPage/' + id);
   }
   /*
	if (redirect) {
		return <Redirect to="/singleplaylistpage" />;
	}
*/

   console.log('playlists from PLAYLISTS', playlists);
   useEffect(() => {
      getPlaylistsDb();
   }, []);

   return (
      <ul>
         {/* If you put playlists == {} you can search songs */}
         {playlists.length > 0 &&
            playlists.map((playlist) => (
               <li
                  value={playlist.Id}
                  key={playlist.Id}
                  onClick={(e) => goToSinglePlaylist(e.target.value)}
               >
                  {playlist.Name}
               </li>
            ))}
      </ul>
   );
}

export default Playlists;
