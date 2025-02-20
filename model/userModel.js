// Used for defining the Schema and user Model for the user data in mongoDB
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    address:{
        type:String,
        required : true
    }
})

export default mongoose.model("users",userSchema);