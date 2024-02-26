const multer = require("multer");
const path = require('path')


// Generate Storage
const storage = multer.diskStorage({
    destination: './public/uplods/',
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// File Upload
const upload = multer({
    storage,
    limits: {fieldSize: process.env.UPLOAD_FILE_SIZE},
    fileFilter: function(req,file,cb){
        fileType(file,cb)
    }
})


// File Filter
const fileType = function(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname))
    const mimeType = fileTypes.test(file.originalname)

    if(extname && mimeType){
        cb(null, true)
    } else {
        cb("Error: File Not Upload!!!")
    }
}


module.exports = upload