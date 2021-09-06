const db = require('../model/memberModel')

// a controle to register a new member
async function registerMemberCont(request, response) {

  let result = null;

  try {

    let member = request.body;

    let insert = await db.registerMember(member)

    member.id = insert.lastInsertRowid

    result = member


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

    let select = await db.login(credentials)

    console.log(select);

    result = select


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

// TO DO

// A CTL to logout user


module.exports.registerMemberCont = registerMemberCont;
module.exports.loginCont = loginCont;

