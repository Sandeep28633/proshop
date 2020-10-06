const express = require('express')
const {
  getSignIn,
  getSignOut,
  getProfile,
  getSignUp,
  logoutAll,
  updateUserProfile,
} = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', getSignUp)
router.post('/login', getSignIn)
router.post('/logoutAll', auth, logoutAll)
router.post('/logout', auth, getSignOut)
router.put('/profile', auth, updateUserProfile)
router.get('/profile', auth, getProfile)

module.exports = router
