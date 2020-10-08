const express = require('express')
const {
  getSignIn,
  getSignOut,
  getProfile,
  getSignUp,
  logoutAll,
  updateUserProfile,
  getUsers
} = require('../controllers/userController')
const {auth, isAdmin} = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/',auth,isAdmin,getUsers)
router.post('/', getSignUp)
router.post('/login', getSignIn)
router.post('/logoutAll', auth, logoutAll)
router.post('/logout', auth, getSignOut)
router.put('/profile', auth, updateUserProfile)
router.get('/profile', auth, getProfile)

module.exports = router
