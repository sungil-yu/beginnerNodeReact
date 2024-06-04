const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', async function (next) {
    try{
        const user = this
        if (!user.isModified('password')) return next()

        const salt = await bcrypt.genSalt(saltRounds)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (err){
        next(err)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }