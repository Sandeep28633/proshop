const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }]
  },
  { timestamps: true }
)

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  user.tokens = [...user.tokens, {token}]
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Invalid username or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid username or password')
  }

  return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
