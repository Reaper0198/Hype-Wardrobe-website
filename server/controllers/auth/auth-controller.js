const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')


// register
const register = async(req, res) =>{

    const {userName, email, password} = req.body;

    try{

        const hashPassword = await bcrypt.hash(password, 12);

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        });
    }
}



// login 
const login = async(req, res) =>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        });
    }
}



// logout