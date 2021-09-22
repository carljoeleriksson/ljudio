import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap/';
import { Context } from '../components/SearchRender';

function PlaylistModal(song, { getPlaylist }) {
   function getToken() {
      return sessionStorage.getItem('auth');
   }
   console.log('PLAYLISTS AS PROPS', getPlaylist);

   const [show, setShow] = useContext(Context);
   const [newPlaylist, setNewPlaylist] = useState('');
   const [playlists, setPlaylists] = useState();
   const [selectedPlaylist, setSelectedPlaylist] = useState('');

   const handleClose = () => setShow(false);
   //const handleShow = () => setShow(true);

   async function getPlaylistsDb() {
      const TokenKey = getToken();
      const response = await fetch('/api/browse_playlists', {
         headers: { Authorization: `Bearer ${TokenKey}` },
      });
      const data = await response.json();

      if (data) {
         console.log('getPlaylistDb if', data);
      } else {
         console.log('getPlaylistDb else', data);
      }

      setPlaylists(data);
      console.log(data);
   }

   // first soultion
   useEffect(() => {
      getPlaylistsDb();
   }, []);

   // create new playlist event handler
   async function createNewPlaylist() {
      const TokenKey = getToken();
      console.log('TOKENKEY', TokenKey);

      // CREATE PLAYLIST FUNCTION
      if (newPlaylist !== '') {
         const response = await fetch('/api/create_playlist', {
            method: 'POST',
            body: JSON.stringify({
               Name: newPlaylist,
            }),
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${TokenKey}`,
            },
         });
         const data = await response.json();

         if (data.error) {
            console.log(data.message);
         } else {
            console.log('Created a new playlist');
            //console.log(data)
            setPlaylists(data)
         }

      }
   }
   async function addToPlaylistDb() {
      const TokenKey = getToken();
      console.log('TOKENKEY', TokenKey);

      const response = await fetch('/api/add_to_playlist', {
         method: 'POST',
         body: JSON.stringify({
            Playlist_id: selectedPlaylist,
            Content: song,
         }),
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TokenKey}`,
         },
      });
      const data = await response.json();
      console.log(data);

      if (data.error) {
         console.log('Please select a playlist', data);
      } else {
         console.log('Song was added to playlist', data);
      }
   }


   //console.log("newPlaylist", newPlaylist);
   return (
      <>
         {/*<Button variant="primary" onClick={handleShow}>Launch demo modal</Button>*/}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add to playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div>
                  <label htmlFor="new-playlist-input">Create playlist</label>
                  <input
                     type="text"
                     placeholder="New playlist name..."
                     name="new-playlist-input"
                     className="new-playlist-input"
                     onChange={(e) => setNewPlaylist(e.target.value)}
                  />
                  <Button
                     variant="primary" size="sm"
                     onClick={() => {
                        createNewPlaylist();
                     }}
                  >
                     +
                  </Button>
               </div>
               <select onChange={(e) => setSelectedPlaylist(e.target.value)}>
                  <option> -- select playlist -- </option>
                  {playlists &&
                     playlists.map((playlist) => (
                        <option value={playlist.Id} key={playlist.Id}>
                           {playlist.Name}
                        </option>
                     ))}
               </select>
               <Button
                  variant="primary"
                  onClick={() => {
                     addToPlaylistDb();
                  }}
               >
                  Add to playlist
               </Button>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default PlaylistModal;
