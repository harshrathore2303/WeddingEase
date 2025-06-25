import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        return res.status(401).json({message: "No token provided"});
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json({message: "Invalid token"});
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({message: "Invalid token"});
  }
};
