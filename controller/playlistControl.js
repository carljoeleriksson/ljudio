const db = require('../model/playlistModel')
//const jwt = require('jsonwebtoken');


// a controle to create a new playlist
async function createPlaylistCont(request, response) {

  let result = null;

  try {


    let user_id = request.userId


    let insert = await db.createPlaylist(user_id)

    //console.log(insert)

    let playlist_id = insert.lastInsertRowid

    result = playlist_id

    response.status(201)

    // catch any throwable error 
  } catch (e) {
    // log error to server  
    console.log(e.message);


    // assign catched error as json obj
    result = {
      "error": e.name,
      "message": e.message
    };

  }
  // return result
  response.json(result);

}
module.exports.createPlaylistCont = createPlaylistCont;
