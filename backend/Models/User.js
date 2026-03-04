const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : { 
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required: true
    },
    role : {
        type : String,
        enum : ['admin','siteEngineer','inventoryManager'],
        default : 'siteEngineer',
        required : true
    },
    projectCode:{
  type: String,
  required: true
}

})

const userModel = mongoose.model("users",UserSchema)

module.exports = userModel