import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap/';
import { FaPlus } from 'react-icons/fa';
import { ModalContext } from '../components/SearchRender';
import { GeneralContext } from '../pages/HomePage';

function PlaylistModal(song, { getPlaylist }) {
   function getToken() {
      return sessionStorage.getItem('auth');
   }
   console.log('PLAYLISTS AS PROPS', getPlaylist);

   const [show, setShow] = useContext(ModalContext);

   const [playlistsCxt, setPlaylistsCxt] = useContext(GeneralContext);

   const [newPlaylist, setNewPlaylist] = useState('');
   const [playlists, setPlaylists] = useState();
   const [selectedPlaylist, setSelectedPlaylist] = useState('');
   const [message, setMessage] = useState()


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
          //  console.log(data)
            setPlaylists(data)
            setPlaylistsCxt(data)
        //    console.log('setPlaylistsCxt')
         //   console.log(playlistsCxt)

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
         console.log(data.message);
         setMessage(data.message)
      } else {
         console.log('Song is added to playlist', data);
         setMessage('Song is added to playlist')
      }
   }


   //console.log("newPlaylist", newPlaylist);
   return (
      <>
         {/*<Button variant="primary" onClick={handleShow}>Launch demo modal</Button>*/}

         <Modal show={show} onHide={handleClose} dialogClassName="modal-add-to-playlist">
            <Modal.Header closeButton>
               <Modal.Title>Add to playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="add-to-playlist-wrapper">
                  <h5>Create New</h5>
                  <input
                     type="text"
                     placeholder="New playlist name..."
                     name="new-playlist-input"
                     className="new-playlist-input"
                     onChange={(e) => setNewPlaylist(e.target.value)}
                  />
                  <button
                  className="btn modal-btn"
                     onClick={() => {
                        createNewPlaylist();
                     }}
                  >
                     <FaPlus />
                  </button>
                  <h5>or add to existing</h5>
                  <select className='select-dropdown' onChange={(e) => setSelectedPlaylist(e.target.value)}>
                     <option> --select playlist-- </option>
                     {playlists &&
                        playlists.map((playlist) => (
                           <option value={playlist.Id} key={playlist.Id}>
                              {playlist.Name}
                           </option>
                        ))}
                  </select>
                  <button
                     className="btn modal-btn"
                     onClick={() => {addToPlaylistDb()}}>
                     ADD
                  </button>
                  {message}
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default PlaylistModal;
