import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

import route from "./routes/userRoutes.js";
// const route = require("./routes/userRoutes.js")

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database Connected Successfully");
    console.log(`Sever is running on PORT${PORT}`);
}).catch((err)=>{
    console.log(err);
})


app.get("/",function(req,res){
    res.send("Reached");
})

app.use(bodyParser.json());
app.use("/api/user",route);
app.listen(PORT);