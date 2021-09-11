// import the database module
const sqlite = require('better-sqlite3')


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

    }

}
