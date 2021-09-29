const { Router } = require('express');
const router = new Router();

const { registerMemberCont, loginCont, isLoggedIn } = require('../controller/memberControl.js');
const { user } = require('../middleware/auth.js');


// a route for register new member
router.post('/registerMemeber', registerMemberCont);

// a route for login user
router.post('/login', loginCont);

// is logged in
router.get('/isLoggedIn',user, isLoggedIn)

module.exports = router;