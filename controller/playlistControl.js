
const db = require('../model/playlistModel')

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

// a controle to add media to the playlist

/*
{
  "Email" : "mr.omr86@gmail.com",
  "Password": "pwd123"
} */

/* request body :JSON
{
"playlist_id" : "",
 "content" : [
   {
    "playlistId": "RDAMVMcZdSLzqV3MY",
    "videoId": "cZdSLzqV3MY"

   },
   {
    "playlistId": "RDAMVMYOfxZQmoIqs",
    "videoId": "YOfxZQmoIqs"
   }
 ] 
}
*/

async function addToPlaylistCont(request, response) {

  let result = null;

  try {

    let user_id = request.userId

    console.log("User Id:" + user_id)


    let reqData = request.body;

    let playlist_id = reqData.playlist_id

    let rawContent = reqData.content

    let content = JSON.stringify(rawContent)

    let update = await db.addToPlaylist(user_id, playlist_id, content)
    console.log(update)

    // let db_change = update.changes

    result = update


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
module.exports.addToPlaylistCont = addToPlaylistCont;

