const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const uploader = multer({ dest: 'uploads/multiple' })


router.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve('www/html/multiple-file-upload.html'))
    })
    .post(uploader.array('uv-file', 5), (req, res) => {

        /* If you set keep original file 
        name to true the following code block will rename uploaded file to its original name.. */

        if (req.body['keep-original-file-name']) {
            let files = req.files;
            let filesIndex = files.length - 1;

            files.forEach((x, i) => {
                let oldPath = path.resolve(x.path);
                let newPath = path.resolve(x.destination, x.originalname);
                fs.rename(oldPath, newPath, err => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (i === filesIndex) {
                            res.send(req.files);
                        }
                    }

                })
            });

        } else {
            res.send(req.files);
        }
    });

module.exports = router;
