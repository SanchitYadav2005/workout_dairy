const User = require('../models/User');

// login user 

module.exports.loginUser = async (req,res) =>{
    res.json({msg: "login user"})
}

//sign up user

module.exports.signUpUser = async (req,res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.signUp(email, password)

        res.status(200).json({email, user})

    }catch(error){
        res.status(400).json({message: error.message})
    }
}