const express = require('express')
const {getSignIn,getSignOut,getProfile,getSignUp} = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/signup',getSignUp)
router.post('/login',getSignIn)
router.get('/profile',auth,getProfile)
router.get('/logout',getSignOut)

module.exports = router