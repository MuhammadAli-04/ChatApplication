const mongoose = require('mongoose');
const {User} = require('../models/userModel');
const {errorCodes} = require("../utilities/errorCodes");


mongoose.connect("mongodb://127.0.0.1:27017/chatapplication").then(()=>{console.log("Database Connected!")}).catch((error)=>{console.log(`error in connecting database: ${error.message}`)});

const saveUser = async (userDetails) => {
    try{
        let user = User({
            email: userDetails.email,
            password: userDetails.password,
            name: userDetails.name,
            contactNo: userDetails.contactNo,
        });
        await user.save();
        return {message: "User saved successfully.", success: true, user: user, errorCode:null};
    }catch(error){
        console.log(`databaseController <> saveUser: error -> ${error}`);
        if(errorCodes.has(error.errorCode || error.code)){
            return {message:errorCodes.get(error.code), success:false, errorCode:error.code || error.errorCode};
        }
        return {message:error.message, success: false, errorCode:error.errorCode || error.code};
    }
};

const validateUser = async (userDetails) => {
    try{
        const user = await User.findOne({email: userDetails.email});
        if(user){
            const result = await user.comparePassword(userDetails.password);
            if(result){
                return {message:"User authenticated successfully",success:true, user: user, errorCode:null};
            }else{
                return {message: "Wrong Password", success:false, errorCode:406};
            }
        }else{
            return {message: "User not found", success:false, errorCode:406};
        }
    }catch(error){
        console.log(`databaseController <> validateUser : error -> ${error}`);
        return {message: errorCodes.get(500), success:false, errorCode:500}
    }
};

module.exports = {saveUser,validateUser};