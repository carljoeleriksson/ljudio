// import the database module
const sqlite = require('better-sqlite3')


// create a connection to the database
const conn = sqlite('database.db')

function run(query, params = {}) {
  // prepare statement
  const stmt = conn.prepare(query)
  return stmt.run(params)
}


// check if an obj has an empty property value 
function isEmpty(data = {}) {

  let result = false

  Object.keys(data).map((m) => {

    if (data[m] == null || data[m] == "") {

      result = true;

    }

  })

  if (result) {

    return true

  } else {

    return false

  }
}



module.exports = {

  // register a user

  registerMember(member) {

    if (isEmpty(member)) {
      throw Error("All fields should be filled!")
    }

    // TO DO 
    // check an email is valid

    const query = 'INSERT INTO Members(FirstName, LastName, Email, Password) VALUES(:FirstName, :LastName, :Email, :Password)'
    return run(query, member)


  },

  // Login 
  login(credentials) {

    if (isEmpty(credentials)) {
      throw Error("All fields should be filled!")
    }

    const select = 'SELECT Id FROM Members WHERE Email = ? AND Password = ?'

    const stml = conn.prepare(select)

    const user = stml.get([credentials.Email, credentials.Password])

    //console.log(user.Id)

    if (!user) {
      throw Error('Wrong Credentials');
    }

    return user


  },
}


// TO DO


// logout 