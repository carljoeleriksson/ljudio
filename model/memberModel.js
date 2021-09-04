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


  }
}


// TO DO
// login 

// logout 