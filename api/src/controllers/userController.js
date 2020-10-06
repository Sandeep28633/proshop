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
    res.status(400).send({error:e.message})
  }
}

const getSignIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body)
    //genreate token and send
    const token = await user.generateAuthToken()
    res.status(200).send({ ...basicDetails(user), token })
  } catch (error) {
    res.status(401).send(error.message)
  }
}

const getProfile = async (req, res) => {
  try {
    res.send({ ...basicDetails(req.user) })
  } catch (e) {
    res.status(500).send()
  }
}

const getSignOut = async (req, res) => {}

const basicDetails = (user) => {
  const { _id, name, email, isAdmin } = user
  return { _id, name, email, isAdmin }
}

module.exports = { getSignIn, getSignOut, getProfile, getSignUp }
