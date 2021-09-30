// import the database module
const sqlite = require('better-sqlite3')
const { nanoid } = require('nanoid');


const validator = require('../utilities/validator')



// create a connection to the database
const conn = sqlite('database.db')
/*
function run(query, params = {}) {
    // prepare statement
    const stmt = conn.prepare(query)
    return stmt.run(params)
} */




module.exports = {
    // check if user owns a playlist then return its Id
     getUserPlaylistId(user_id, playlist_id) {

    console.log("User#Id" + user_id + " wants to add/delete/share to/from playlist#Id: " + playlist_id)


    const select = 'SELECT Id FROM PLaylists WHERE User_id = ? AND Id = ?'

    const stml = conn.prepare(select)

    const playlistId = stml.get([user_id, playlist_id])


    if (!playlistId) {

        console.log("DB injection attempt!")

        throw Error('Can not find the playlist!');

    }

    console.log("Server Answer: Ok!")

    return playlistId.Id

},

//create a playlist

createPlaylist(user_id, playlist_name) {

    if (!user_id) {

        throw Error("Invalid User ID!")

    }

    if (!playlist_name) {

        throw Error("Playlist Name is missing!")

    }

    const query = 'INSERT INTO PlayLists(User_id, Name) VALUES(?, ?)'

    //   return run(query, { user_id })
    const insert = conn.prepare(query).run(user_id, playlist_name)

    return insert

},
// check if song already in playlist
checkPlaylistContent (playlist_id, content){

    const select = 'SELECT Id FROM Playlists_Content WHERE Playlist_id = ? AND Content =?'

    const stml = conn.prepare(select)

    const content_id = stml.get([playlist_id, content])

    console.log(content_id)


    if (content_id) {

        throw Error('this song is already in this playlist!');

    }

    return true
},


// Add a song to playlist

addToPlaylist(user_id, playlist_id, content) {

    if (!user_id) {

        throw Error("Invalid User ID!")

    }

    if (!playlist_id) {

        throw Error("Invalid Playlist ID!")

    }
    // TO DO Content validation
    // if (content.length == 0 || validator.isEmpty(content[0])) {

    //   throw Error("Invalid Content!")

    //}



    const insert = conn.prepare('INSERT INTO PlayLists_Content(Playlist_id, Content) VALUES(?, ?)')
        .run(playlist_id, content)


    return insert

},

browseUserPlaylists(user_id) {

    const select = 'SELECT Id, Name FROM PLaylists WHERE User_id = ?'

    const stml = conn.prepare(select)

    const playlist = stml.all([user_id])


    if (!playlist) {

        throw Error('Can not browse playlists!');

    }

    return playlist
},

fetchPlaylistContent(playlist_id) {

    //playlist_db_id = getUserPlaylistId(user_id, playlist_id)


    const select = 'SELECT * FROM PLaylists_Content WHERE Playlist_id = ?'

    const stml = conn.prepare(select)

    const playlist_content = stml.all([playlist_id])


    if (!playlist_content) {

        throw Error('Can not fetch playlist content!');

    }

    return playlist_content
},
//Delete a media/song from playlist
deleteFromPlaylist(user_id, id, playlist_id){

    //playlist_db_id = getUserPlaylistId(user_id, playlist_id)

    const del = 'DELETE FROM PLaylists_Content WHERE Playlist_id = ? AND Id = ?'

    const stml = conn.prepare(del).run(playlist_id, id)

    return stml

},
//Delete whole playlist
deletePlaylist(user_id, playlist_id){

    //playlist_db_id = getUserPlaylistId(user_id, playlist_id)

    //const delPlaylistContent = 'DELETE FROM PLaylists_Content WHERE Playlist_id = ?'

    //const stml = conn.prepare(delPlaylistContent).run(playlist_id)

    const delPlaylist = 'DELETE FROM PLaylists WHERE Id = ?'

    const stml2 = conn.prepare(delPlaylist).run(playlist_id)


    console.log("Delete Playlist#Id: " + playlist_id)

   // console.log(stml)

    console.log(stml2)

    return stml2

},
// share playlist
sharePlaylist(user_id, playlist_id) {

    if (!user_id) {

        throw Error("Invalid User ID!")

    }

    if (!playlist_id) {

        throw Error("Invalid Playlist ID!")

    }



    //playlist_db_id = getUserPlaylistId(user_id, playlist_id)

    let sharing_code = nanoid();

    const insert = conn.prepare('INSERT INTO PlayLists_Share(Playlist_id, Code) VALUES(?, ?)')
        .run(playlist_id, sharing_code)


    return sharing_code

},
// browse shared playlist content
fetchSharedPlaylistContent(code){

    if (!code) {

        throw Error("No sharing code provided!")

    }

    const select = 'SELECT plc.Id, plc.Playlist_id, plc.Content FROM PLaylists_Content as plc LEFT JOIN Playlists_Share as pls ON pls.Playlist_id = plc.Playlist_id WHERE pls.Code = ?'

    const stml = conn.prepare(select)

    const playlist_content = stml.all([code])

    if (!playlist_content) {

        throw Error('Can not fetch playlist content!');

    }

    return playlist_content


}

}
