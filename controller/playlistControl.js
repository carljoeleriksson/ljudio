
const db = require('../model/playlistModel')
//const { fetchInfo, connectTopApi } = require('../model/mediaModel')

// a controle to create a new playlist
async function createPlaylistCont(request, response) {

  let result = null;

  try {


    let user_id = request.userId

    let reqData = request.body

    let playlist_name = reqData.Name

    let insert = await db.createPlaylist(user_id, playlist_name)

    //console.log(insert)

    //let playlist_id = insert.lastInsertRowid

    let playlist = await db.browseUserPlaylists(user_id)

    result = playlist
   // result = playlist_id

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

// a controle to add media to the playlist

/*
{
  "Email" : "mr.omr86@gmail.com",
  "Password": "pwd123"
} */

/* request body :JSON
{
"Playlist_id" : "",
 "Content" : media json obj
}
*/

async function addToPlaylistCont(request, response) {

  let result = null;

  try {

    let user_id = request.userId

    console.log("User Id:" + user_id)


    let reqData = request.body;

    let playlist_id = reqData.Playlist_id

    let rawContent = reqData.Content

    let content = JSON.stringify(rawContent)

    let insert = await db.addToPlaylist(user_id, playlist_id, content)

    console.log(insert)

    // let db_change = update.changes

    let content_id = insert.lastInsertRowid

    result = content_id


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

// A controle to browse a playlists
async function browseUserPlaylistsCont(request, response) {

  let result = null;

  try {


    let user_id = request.userId

    //let playlist_id = request.params.id

    let playlist = await db.browseUserPlaylists(user_id)

    result = playlist


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



// A controle to delete a song from playlists
async function deleteFromPlaylist(request, response) {

  let result = null;

  try {


    let user_id = request.userId

    let playlist_id = request.params.playlistId

    let content_id = request.params.contentId


    let del = await db.deleteFromPlaylist(user_id, content_id, playlist_id)

    if (del.changes == 0) {

      throw Error("Can not find that content in playlist!")

    }



    result = del


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

// A controle to delete a whole playlists
async function deletePlaylist(request, response) {

  let result = null;

  try {

    let user_id = request.userId

    let playlist_id = request.params.playlistId

    console.log(playlist_id)

    let del = await db.deletePlaylist(user_id, playlist_id)


    result = del


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

// A controle to fetch a playlist's content
async function fetchPlaylistContentCont(request, response) {

  let result = null;

  try {


    let user_id = request.userId

    let playlist_id = request.params.id

    let playlist_content_json = await db.fetchPlaylistContent(user_id, playlist_id)

    let reformat_content = []

    for (const el of playlist_content_json) {

      // console.log(JSON.parse(el.Content))
      let elContentToObj = JSON.parse(el.Content)

      reformat_content.push(elContentToObj)

    }

    result = reformat_content

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
module.exports.addToPlaylistCont = addToPlaylistCont;
module.exports.browseUserPlaylistsCont = browseUserPlaylistsCont
module.exports.fetchPlaylistContentCont = fetchPlaylistContentCont
module.exports.deleteFromPlaylist = deleteFromPlaylist
module.exports.deletePlaylist = deletePlaylist