import React, {useEffect, useState} from 'react';

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
// console.log('getPlaylists data ', data);
      if (data.length > 0 ) {
         
         setPlaylistContent(data);

      } else if(data.Error) {
         setError(data.message)

        }
     

   }
   useEffect(() => {
      //console.log(playlistHistory)
      //console.log("Playlist Id"+    playlistHistory.location.state.playlistId
     // );
   getSinglePlaylist()
//setPlaylistContent(data)
      
   }, [])

   //Dummy data below!
  /* const playlistContent = {
      playlistName: 'Playlist 1',
      songs: [
         {
            videoId: 'kjv81nv',
            name: 'Bohemian Rhapsody',
            artist: {
               name: 'Queen',
            },
         },
         {
            videoId: 'kjv81nv',
            name: 'Bohemian Rhapsody',
            artist: {
               name: 'Queen',
            },
         },
         {
            videoId: 'kjv81nv',
            name: 'Bohemian Rhapsody',
            artist: {
               name: 'Queen',
            },
         },
         {
            videoId: 'kjv81nv',
            name: 'Bohemian Rhapsody',
            artist: {
               name: 'Queen',
            },
         },
      ],
   };
*/
   return (
      <>
         <h2>{playlistHistory.location.state.playlistName}</h2>
         <ul className="playlist-container">
            {playlistContent.length > 0 && playlistContent.map((song) => ( 
               <li key={song.videoId}>
                  <p className="song-title">{song.name}</p>
                  <p className="artist-name">{song.artist.name}</p>
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
