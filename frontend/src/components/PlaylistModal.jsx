import React, { useState, useContext }from 'react'
import {Button, Modal} from 'react-bootstrap/';
import { Context } from '../components/SearchRender'

function PlaylistModal(song) {
	
	function getToken() {
		return sessionStorage.getItem('auth');
	  }

	const [show, setShow] = useContext(Context);
	const [newPlaylist, setNewPlaylist] = useState("")
	const [playlists, setPlaylists] = useState("")
	const [selectedPlaylist, setSelectedPlaylist] = useState("")

	const handleClose = () => setShow(false);
	//const handleShow = () => setShow(true);

	async function getPlaylistsDb() {
		const response = await fetch('/api/browse_playlists')
		const data = await response.json();

		if (data) {
			console.log('getPlaylistDb if', data);
		} else {
			console.log('getPlaylistDb else',data);
		}
		console.log("getPlaylists data ", data);

		setPlaylists(data);
	}

	getPlaylistsDb();

	async function addToPlaylistDb() {
		const TokenKey = getToken()

		// CREATE PLAYLIST FUNCTION
		if(newPlaylist !== "") {
			const response = await fetch('/api/create_playlist', {
				method: 'POST',
				body: JSON.stringify({
					"Name" : newPlaylist,
					"Content": song
				}),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${TokenKey}`
				}
			})
			const data = await response.json();
	
			if (!data.error === 'Error') {
				console.log('if data.success', data);
			} else {
				console.log('else data.success', data);
			}

			//ADD TO EXISTING PLAYLIST FUNCTION
		} else {
			const response = await fetch('/api/add_to_playlist', {
				method: 'POST',
				body: JSON.stringify({
					"Playlist_id": selectedPlaylist,
					"Content": song
				}),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${TokenKey}`
				}
			})
			const data = await response.json();
	
			if (!data.error === 'Error') {
				console.log('if data.success', data);
			} else {
				console.log('else data.success', data);
			}
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
			<label for="new-playlist-input">Create playlist</label>
			<input
					type="text" 
					placeholder="New playlist name..."
					name="new-playlist-input"
					className="new-playlist-input"
					onChange={e => setNewPlaylist(e.target.value)}
			/>
			<select onChange={e => setSelectedPlaylist(e.target.value)}>
				<option disabled selected value> -- or select playlist -- </option>
				{playlists.map(playlist => (
					<option value={playlist.id} key={playlist}>{playlist}</option>
				))}
			</select>
			
		  </Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
			  Close
			</Button>
			<Button variant="primary" onClick={e => addToPlaylistDb()}>
			  Add to playlist
			</Button>
		  </Modal.Footer>
		</Modal>

	  </>
	);
}

export default PlaylistModal
