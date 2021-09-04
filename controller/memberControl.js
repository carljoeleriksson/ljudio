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


// TO DO


// a CTL to login user

// A CTL to logout user


module.exports.registerMemberCont = registerMemberCont;
