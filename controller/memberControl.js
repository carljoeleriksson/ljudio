const db = require('../model/memberModel')
const jwt = require('jsonwebtoken');


// a controle to register a new member
async function registerMemberCont(request, response) {

  let result = null;

  try {

    let member = request.body;

    let insert = await db.registerMember(member)

    member.id = insert.lastInsertRowid

    result = member

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




// a CTL to login user

async function loginCont(request, response) {

  let result = null;

  try {

    let credentials = request.body;

    let user = await db.login(credentials)


    console.log('A loggged in User:' + user.Id);

    // Sign loggedIn user using jwt  
    const token = jwt.sign({ id: user.Id }, 'zdt346', {
      expiresIn: "10h" //Går ut om 10 h 
        });
    // reassign the token of signed user 
    result = token;

    //result = select


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


// a CTL to logged in user 
async function isLoggedIn(request, response) {

  let result = null;

  try {

    let user_id = request.userId

    result = user_id


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


module.exports.registerMemberCont = registerMemberCont;
module.exports.loginCont = loginCont;
module.exports.isLoggedIn = isLoggedIn;


