import jwt from "jsonwebtoken";
import { Owner } from "../models/owner.models.js";

export const verifyOwnerJWT = async (req, res, next) => {
  try {
    console.log(process.env.ACCESS_TOKEN_OWNER)
    const token = req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");
    
    console.log(token)
    
    if (!token){
      return res.status(404).json({message: "No token provided"});
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_OWNER);
    console.log(decodedToken)

    const owner = await Owner.findById(decodedToken?._id).select("-password");

    req.owner = owner;
    next();
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
};
