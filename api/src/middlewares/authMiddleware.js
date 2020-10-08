const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const auth = async (req, res, next) => {

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) throw new Error()
    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({message:"Please authethicate"});
  }
}

const isAdmin = async(req,res,next)=>{
  try {
    if(req.user && req.user.isAdmin){
      next()
    }else{
      res.status(401)
      throw new Error('Not authorized as admin')
    }
  } catch (error) {
    res.status(404).send({message:error.message})
  }

}

module.exports = {isAdmin,auth}