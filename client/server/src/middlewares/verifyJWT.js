import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        return res.status(404).json({message: "No token provided"});
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
};
