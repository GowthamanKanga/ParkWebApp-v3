const mongoose = require("mongoose");
const {isEmail} = require('validator')
const User = require('../models/userModels')

const AdminSchema = new mongoose.Schema({

    user : User.getSchema
    
    // first_name:{
    //     type:String,
    //     required : [true, "Please enter a First name."],


    // },
    // last_name:{
    //     type:String,
    //     required : [true, "Please enter a Last name."],

    // },
    // email:{
    //     type:String,
    //     required : [true, "Please enter an Email."],
    //     unique: true,
    //     validate:[isEmail, "Please Enter a valid Email."]


    // },
    // gender:{
    //     type:String,
    //      enum : { values: ['Male', 'Female','Other'], message: '{VALUE} is not supported' },
    //      required : [true, "Please enter a Gender."],

    // },
    // isLoggedIn: {
    //     type: Boolean,
    //     default: false
    // }
   
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;

AdminSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
};

AdminSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
};