// Made for Practice

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://omkarchoudhari2003:Know%402003@cluster0.hm68a.mongodb.net/random").then(()=>{
    console.log("Database Connected sucessfully")
    console.log(`Server is running on PORT${PORT}`)
}).catch((err)=>{
    console.log(err);
})

import User from "./export.js"
// const rand = mongoose.model("rand",userSchema)

app.get("/getAllUsers",async function(req,res){
   try {
     const users = await User.find();
 
     if(users === 0){
         return res.status(404).json({message:"User not found"})
     }
     res.status(200).json(users)
   } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
   }
})

app.post("/create",async function(req,res){
    try {
        const userData = await User(req.body);
        const {email} = req.body.email;
    
        const userExist = await User.findOne({email});
    
        if(userExist){
            req.status(400).json({message:"User Already Exists"})
        }
    
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
})

app.put("/update/:id",async function(req,res){
    try {
        const id = req.params.id;
    
        const userExist = await User.findOne({_id:id});
    
        if(!userExist){
            return res.status(404).json({message:"User not Found"});
        }
    
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
    
        res.status(201).json({message:"Updated Successfully"}); 
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
})

app.delete("/deleteUser/:id",async function(req,res){
    try {
        const id = req.params.id;

        const userExist = await User.findOne({_id:id});

        if(!userExist){
            return res.status(404).json({message:"user not found"});
        }

        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
})


app.listen(PORT);

