const express = require('express');
const app = express();
const port = 3000;

require('./app/routes')(app);

app.listen(port, () => console.log('Listening At Port : ' + port));