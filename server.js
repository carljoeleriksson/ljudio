
const express = require('express');
const app = express();

app.use(express.json());

const memberRouter = require('./routes/member');
// app.use(express.static('./react/games/dist'));

// our app has two different routes bases: /api/auth/ route base and /api/event route base
app.use('/api', memberRouter); // 


app.listen(8000, () => {
  console.log('Server started');


});