const express = require('express')
const path = require('path')
const multer = require('multer')
const {auth, isAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    return cb(new Error('Please upload a image'))
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', auth,isAdmin,upload.single('image'),(req, res) => {
    res.send(`/${req.file.path}`)
},
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

module.exports = router
