const User = require('../models/UserModel')

const getSignUp = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const isExist = await User.findOne({ email })
    if (isExist) {
      res.status(400)
      throw new Error('User already Exists')
    }
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    if (!user) {
      res.status(404)
      throw new Error('Unable to create user')
    }

    res.status(201).send({ ...basicDetails(user), token })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

const getSignIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body)
    //genreate token and send
    const token = await user.generateAuthToken()
    res.status(200).send({ ...basicDetails(user), token })
  } catch (error) {
    res.status(401).send({ message: error.message })
  }
}

const getProfile = async (req, res) => {
  try {
    res.send({ ...basicDetails(req.user) })
  } catch (e) {
    res.status(500).send()
  }
}

const getSignOut = async (req, res) => {
  try {
    const token = req.token
    // on logout remove that token from tokens array in user profile
    req.user.tokens = req.user.tokens.filter((item) => item.token != token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send({message:e.message})
  }
}

// const updateUserProfile = async (req, res) => {
//   const updates = Object.keys(req.body)
//   const token = req.token
//   const allowedUpdates = ['name', 'email', 'password']
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   )

//   if (!isValidOperation) {
//     return res.status(400).send({ message: 'Invalid updates!' })
//   }

//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]))
//     await req.user.save()
//     res.send({ ...basicDetails(req.user),token })
//   } catch (e) {
//     res.status(400).send({ message: e.message })
//   }
// }

const updateUserProfile = async (req, res) => {
  try {
    const user = req.user
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.send({ ...basicDetails(updatedUser) })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

const basicDetails = (user) => {
  const { _id, name, email, isAdmin } = user
  return { _id, name, email, isAdmin }
}

module.exports = {
  getSignIn,
  getSignOut,
  getProfile,
  getSignUp,
  logoutAll,
  updateUserProfile,
  getUsers
}
