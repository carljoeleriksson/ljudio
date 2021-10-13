
const db = require('../model/playlistModel')
//const { fetchInfo, connectTopApi } = require('../model/mediaModel')


// a control to create a new playlist
async function createPlaylistCont(request, response) {

  let result = null;

  try {

    let user_id = request.userId
    let reqData = request.body
    let playlist_name = reqData.Name

    let insert = await db.createPlaylist(user_id, playlist_name)

    let playlist_id = insert.lastInsertRowid

    let playlist = await db.browseUserPlaylists(user_id)

    console.log("New playlist id: ", playlist_id)

    result = playlist

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

async function addToPlaylistCont(request, response) {

  let result = null;

  try {

    let user_id = request.userId

    console.log("User Id:" + user_id)


    let reqData = request.body;

    let playlist_id = reqData.Playlist_id

    let rawContent = reqData.Content

    let content = JSON.stringify(rawContent)

    let playlist_db_id = await db.getUserPlaylistId(user_id, playlist_id)

    let isNotInPlaylist  = await db.checkPlaylistContent(playlist_db_id, content)

    let insert = await db.addToPlaylist(user_id, playlist_db_id, content)

    console.log(insert)

    // let db_change = update.changes

    let content_id = insert.lastInsertRowid

    console.log("New media/content#Id "+content_id +" added to playlist#Id "+ playlist_id)


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
    let playlist_db_id = await db.getUserPlaylistId(user_id, playlist_id)

    let del = await db.deleteFromPlaylist(user_id, content_id, playlist_db_id)

    if (del.changes == 0) {
      throw Error("Can't find song in playlist!")
    }

    console.log("Song id: "+content_id +" deleted from playlist: "+ playlist_id)

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

    let playlist_db_id = await db.getUserPlaylistId(user_id, playlist_id)

    let del = await db.deletePlaylist(user_id, playlist_db_id)

    console.log("Playlist is deleted #Id "+ playlist_id)

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

    let playlist_db_id = await db.getUserPlaylistId(user_id, playlist_id)

    let playlist_content_json = await db.fetchPlaylistContent(playlist_db_id)

    console.log(playlist_content_json)

    let reformat_content = []

    for (const el of playlist_content_json) {

      // console.log(JSON.parse(el.Content))
      let elContentToObj = JSON.parse(el.Content)

      reformat_content.push({Id:el.Id , Playlist_id: el.Playlist_id,Content: elContentToObj})

    }

    result = reformat_content

    //result = playlist_content_json
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

// A controle to share a playlist
async function sharePlaylistCont(request, response) {

  let result = null;

  try {

    let user_id = request.userId
    let playlist_id = request.params.id
    let playlist_db_id = await db.getUserPlaylistId(user_id, playlist_id)

    console.log(playlist_db_id)

    let sharing_code = await db.sharePlaylist(user_id, playlist_db_id)

    console.log(sharing_code)

   // let reformat_content = []

    

    result = sharing_code
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

//A controle to browse shared playlist content
async function fetchSharedPlaylistContentCont(request, response) {

  let result = null;

  try {


    //let playlistId =  request.params.playlistId

    let code = request.params.code


    let playlist_content_json = await db.fetchSharedPlaylistContent(code)

   // console.log(playlist_content_json)

    let reformat_content = []

    for (const el of playlist_content_json) {

      // console.log(JSON.parse(el.Content))
      console.log(el.Id)
      let elContentToObj = JSON.parse(el.Content)

      reformat_content.push({Id:el.Id , Playlist_id: el.Playlist_id,Content: elContentToObj})

    }

    result = reformat_content

    //result = playlist_content_json
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
module.exports.sharePlaylistCont = sharePlaylistCont
module.exports.fetchSharedPlaylistContentCont = fetchSharedPlaylistContentCont