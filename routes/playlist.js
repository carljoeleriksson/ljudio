const { Router } = require('express');
const router = new Router();

const { createPlaylistCont, addToPlaylistCont } = require('../controller/playlistControl.js');
const { user } = require('../middleware/auth.js');


// a route for create a new playlist
router.post('/create_playlist', user, createPlaylistCont);

// a route for add media to the playlist
router.post('/add_to_playlist', user, addToPlaylistCont);



module.exports = router;