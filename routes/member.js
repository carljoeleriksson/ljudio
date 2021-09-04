const { Router } = require('express');
const router = new Router();

const { registerMemberCont } = require('../controller/memberControl.js');


router.post('/registerMemeber', registerMemberCont);

module.exports = router;