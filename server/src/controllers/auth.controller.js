import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { username, email, fullname, password, phone, role } = req.body;

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      fullname.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length is less then 8" });
    }

    const userExist = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "username, email or password already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      fullname,
      password: hashedPassword,
      phone,
      role: role,
    });

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };
    // console.log(loggedInUser)
    return res.status(200).cookie("token", token, options).json(loggedInUser);
  } catch (error) {
    console.log("Error in sign up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username && !email) {
      return res
        .status(400)
        .json({ message: "valid credentials are required" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or email doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, options).json(loggedInUser);
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("token", options)
      .json({ message: "User logout successfully" });
  } catch (error) {
    console.log("Error in logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in check auth:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in get users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login, logout, checkAuth, getUsers };
