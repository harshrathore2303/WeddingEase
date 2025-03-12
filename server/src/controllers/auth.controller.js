import { User } from "../models/user.models.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    throw new Error("Error in generating access token");
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, fullname, password, phone } = req.body;

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
        .status(404)
        .json({ message: "Password length is less then 8" });
    }

    const userExist = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (userExist) {
      return res
        .status(404)
        .json({ message: "username, email or password already exist" });
    }

    const user = await User.create({
      username,
      email,
      fullname,
      password,
      phone,
    });

    // console.log(user)

    return res.status(201).json(user);
  } catch (error) {
    console.log("Error in sign up:", error);
  }
};

const login = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username && !email && !phone) {
      return res.status(400).json({ message: "valid credential is required" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "invalid credential" });
    }

    console.log(user._id);

    const token = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, options).json(loggedInUser);
  } catch (error) {
    console.log("Error in login:", error);
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
    console.log("Error in login:", error);
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in login:", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in login:", error);
  }
};

export { signup, login, logout, checkAuth, getUsers };
