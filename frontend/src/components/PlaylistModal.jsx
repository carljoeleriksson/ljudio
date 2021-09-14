import React, { useState, useContext }from 'react'
import {Button, Modal} from 'react-bootstrap/';
import { Context } from '../components/SearchRender'



function PlaylistModal(song) {

	const [show, setShow] = useContext(Context);
	const [newPlaylist, setNewPlaylist] = useState("")
	//const [playlists, setPlaylists] = useState("")

	const playlists = [ //This is just to test, use the line above instead
		"playlist 1", 
		"playlist 2", 
		"playlist 3", 
		"playlist 4", 
		"playlist 5", 
		"playlist 6", 
		"playlist 7", 
		"playlist 8"
	]

	const handleClose = () => setShow(false);
	//const handleShow = () => setShow(true);

	async function getPlaylistsDb() {
		const response = await fetch('/api/getAllPlaylists')
		const data = await response.json();

		if (data) {
			console.log(data.success);
		} else {
			console.log(data.success);
		}

		setPlaylists(data);
	}

	async function addToPlaylistDb() {
		
		const response = await fetch('/api/addToPlaylist', {
			method: 'POST',
			body: JSON.stringify({
				"songObj": song,
				"newPlaylistName" : newPlaylist
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await response.json();

		if (data) {
			console.log(data.success);
		} else {
			console.log(data.success);
		}
	}


	async function addToPlaylist() {
		setShow(false)
	}

	console.log("newPlaylist", newPlaylist);

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
			<select>
				<option disabled selected value> -- or select playlist -- </option>
				{playlists.map(playlist => (
					<option value={playlist} key={playlist}>{playlist}</option>
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
