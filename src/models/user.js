const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema({
    name:{type: String},
    lastname:{type:String},
    card:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

module.exports = mongoose.model("User",userSchema);