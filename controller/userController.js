// used for handelling the business logic and for interaction with user model.
import User from "../model/userModel.js";

export const create = async(req,res)=>{
    try {
        const userData = new User(req.body);
        const {email} = userData;
        
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        return res.json("Internal Server Error");
    }
}

export const fetch = async (req, res) => {
  try {
    const users = await User.find();

    if(users === 0){
      return res.status(404).json({message:"User Not Found!"});
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

export const update = async (req,res)=>{
  try {
      const id = req.params.id;

      const userExist = await User.findOne({_id:id});

      if(!userExist){
        return res.status(404).json({message:"User not found"});
      }

      const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
      res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({error:"Internal Server Error"});
  }
}

export const deleteUser = async (req,res)=>{
  try {
    const id = req.params.id;

    const userExist = await User.findOne({_id:id})

    if(!userExist){
      res.status(404).json({message:"User not Found"});
    }

    await User.findByIdAndDelete(id);

    res.status(201).json({message:"User Deleted Successfully"});
  } catch (error) {
    return res.status(500).json({error:"Internal Server Error"})
  }
}