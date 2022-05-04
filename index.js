const express = require('express');
const config = require('./config');
const cors = require('cors')

const mongoDBConnection = require('./utils/database');

mongoDBConnection.then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('An error ocurred while connecting to db.', err);
});

require('./models/index');
const apiRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);

app.listen(config.port, () => {    
    console.log('Listening on port ' + config.port);
});