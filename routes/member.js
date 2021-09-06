const { Router } = require('express');
const router = new Router();

const { registerMemberCont, loginCont } = require('../controller/memberControl.js');

// a route for register new member
router.post('/registerMemeber', registerMemberCont);

// a route for login user
router.post('/login', loginCont);


module.exports = router;