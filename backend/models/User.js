const mongoose = require('mongoose');
const bcypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static user signup

userSchema.statics.signUp = async (email, password) => {
    const exists = await this.findOne({email})
    if(!email || !password){
        throw Error("all fields must be filled!")
    }
    if(!validator.isEmail(email)){
        throw Error(`${email} this email is not valid!`)
    }
    if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase:2})){
        throw Error("password is not strong!")
    }
    if(exists){
        throw Error("Email already in use!!")
    }
    // adding salt.
    const salt = await bcypt.genSalt(10)
    // adding hash.
    const hash = await bcypt.hash(password, salt)
    
    const user = await this.create({email, password: hash})

    return user
    
}

module.exports = mongoose.model('User', userSchema);