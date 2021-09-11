const { Router } = require('express');
const router = new Router();

const { createPlaylistCont } = require('../controller/playlistControl.js');
const { user } = require('../middleware/auth.js');


// a route for create a new playlist
router.post('/create_playlist', user, createPlaylistCont);



module.exports = router;