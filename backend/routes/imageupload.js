const express = require('express');
const router = express.Router();

const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        if (true) {
            cb(null, true);
        } else {
            cb(null, false);
            return res.status(400).json({ error: "File types allowed are .jpeg, .png, .jpg" });
        }
    }
});

router.post("/uploadfile", upload.single('file'), function (req, res) {
    console.log(req.file)
    res.json({ "fileName": req.file.filename });
});


const downloadFile = (req, res) => {



    const fileName = req.params.filename;

    const pathParent = process.cwd()
    //console.log(path);

   const path = pathParent + "/uploads/";
   //console.log(path)

    res.download(path + fileName, (error) => {
        if (error) {
            res.status(500).send({ meassge: "File cannot be downloaded " + error })
        }
    })
}
router.get("/files/:filename", downloadFile);


module.exports = router
