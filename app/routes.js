const path = require('path');
const singleFileUpload = require('./routes/single');
const multipleFileUpload = require('./routes/multiple');

module.exports = app => {
    app.get('/', (req, res) => res.sendFile(path.resolve('www/index.html')));
    app.use('/upload/single', singleFileUpload);
    app.use('/upload/multiple', multipleFileUpload);
};