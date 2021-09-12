// import the database module
const sqlite = require('better-sqlite3')

const validator = require('../utilities/validator')



// create a connection to the database
const conn = sqlite('database.db')

function run(query, params = {}) {
    // prepare statement
    const stmt = conn.prepare(query)
    return stmt.run(params)
} 

module.exports = {

    //create a playlist

    createPlaylist(user_id) {

        if (!user_id) {

            throw Error("Invalid User ID!")

        }

        const query = 'INSERT INTO PlayLists(User_id) VALUES(:user_id)'

        return run(query, { user_id })

    },

    // Add songs to playlist

     addToPlaylist(user_id, playlist_id, content){

        if (!playlist_id) {

            throw Error("Invalid Playlist ID!")
      
          }
      
          if (content.length == 0 || validator.isEmpty(content[0])) {
      
            throw Error("Invalid Content!")
      
          }
      
       
        const update = conn.prepare('UPDATE PlayLists SET Content = ? WHERE Id = ? AND User_id = ?')
        .run(content,  playlist_id, user_id)

        if(update.changes == 0){
            throw Error("Invalid user Id/ playlist Id!")

        }
        return update.changes
         
     }



}
