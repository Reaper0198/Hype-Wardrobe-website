const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
//import dotenv from 'dotenv'

// register
const registerUser = async(req, res) =>{

    const {userName, email, password} = req.body;

    try{

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success : false,
                message : "User already exist with this email.Please use different email."

            })
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success : true,
            message : "New Account Created Successfully"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        });
    }
}



// login 
const loginUser = async(req, res) =>{

    const { email, password} = req.body;

    try{

        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.json({
                success : false,
                message : "User doesn't exist.Please create a account first."
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch){
            return res.json({
                success : false,
                message : "Incorrect Password. Please try again."
            })
        }
        const token = jwt.sign({
            id : checkUser._id,
            role : checkUser.role,
            email : checkUser.email,
        },process.env.JWT_SECRET, {expiresIn : '60m'})

        res.cookie('token', token, {httpOnly : true, secure : false}).json({
            success : true,
            message : 'Logged In successfully',
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id
            }
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        });
    }
}



// logout



// Auth Middleware



module.exports =  { registerUser, loginUser };