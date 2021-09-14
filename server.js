const db = require('./database');
const express = require('express');
const app = express();

app.use(express.json());

const memberRouter = require('./routes/member');

const mediaRouter = require('./routes/media');

const playlistRouter = require('./routes/playlist');


// app.use(express.static('./react/games/dist'));

app.use('/api', memberRouter); //

app.use(express.static('/frontend'));

app.use('/api', playlistRouter); 


app.use('/api', mediaRouter);

app.listen(8000, () => {
   console.log('Server started');
});
