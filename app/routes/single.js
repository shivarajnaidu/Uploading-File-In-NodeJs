const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const uploader = multer({ dest: 'uploads/single' })


router.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve('www/html/single-file-upload.html'));
    })
    .post(uploader.single('uv-file'), (req, res) => {

        /* If you set keep original file 
        name to true the following code block will rename uploaded file to its original name.. */
        
        if (req.body['keep-original-file-name']) {
            let oldPath = path.resolve(req.file.path);
            let newPath = path.resolve(req.file.destination, req.file.originalname);
            fs.rename(oldPath, newPath, err => {
                err ? console.log(err) : res.send(req.file);
            })
        } else {
            res.send(req.file);
        }
    });


// router.route('/with-file-size-limit');


module.exports = router;
