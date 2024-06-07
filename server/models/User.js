const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = async function(cb) {
    const user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token

    try{
        await user.save()
        cb(null, user)
    }catch(err){
        return cb(err)
    }
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, 'secretToken', function(err, decoded){
        if (err) return cb(err);
        user.findOne({'_id': decoded, 'token': token})
        .then( user => {
            cb(null, user)
        })
        .catch(err => {
            cb(err)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }