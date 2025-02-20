// For defining the routes and mapping them to appropriate control method for user related operations.
// const express = require("express");
import express from "express"
import {fetch , create , update ,deleteUser} from "../controller/userController.js";
// const fetch = require("../controller/userController.js")

const route = express.Router();

route.post("/create",create);
route.get("/getAllUsers",fetch);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteUser);

export default route;