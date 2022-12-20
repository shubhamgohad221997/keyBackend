const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
     name:{type:String,required:true, unique : true},
    level:{type:String,required:true},
    score:{type:Number,default:0}
   
})
const userModal= mongoose.model("user",userSchema)
module.exports = userModal