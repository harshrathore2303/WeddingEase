// import { Owner } from "../models/owner.models.js";

// const generateAccessToken = async (ownerId) => {
//   try {
//     const owner = await Owner.findById(ownerId);

//     const accessToken = owner.generateAccessToken();
//     // console.log(accessToken);

//     return accessToken;
//   } catch (error) {
//     throw new Error("Error in generating access token");
//   }
// };

// const signup = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (name.trim() === "" || email.trim() === "" || password.trim() === "" || phone.trim() === "") {
//       return res.status(404).json({ message: "All fields required" });
//     }

//     if (password.length < 8) {
//       return res
//         .status(404)
//         .json({ message: "Password length is less then 8" });
//     }
//     const ownerExist = await Owner.findOne({
//       $or: [{ email }, { phone }],
//     });

//     if (ownerExist) {
//       return res.status(404).json({ message: "Owner already exist" });
//     }

//     const owner = await Owner.create({
//       name,
//       email,
//       phone,
//       password,
//       serviceDetail,
//     });

//     return res.status(201).json({ message: "Owner created successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email.trim() === "" || password === "") {
//       return res.status(404).json({ message: "All fields required" });
//     }

//     const owner = await Owner.findOne({
//       $or: [{ email }],
//     });

//     if (!owner) {
//       return res.status(404).json({ message: "account invalid" });
//     }

//     const isPasswordValid = await owner.isPasswordCorrect(password);
//     if (!isPasswordValid) {
//       return res.status(404).json({ message: "enter correct password" });
//     }

//     const token = await generateAccessToken(owner._id);
//     const loggedInOwner = await Owner.findById(owner._id).select("-password");

//     const options = {
//       httpOnly: true,
//       secure: true,
//     };

//     return res.status(200).cookie("token", token, options).json(loggedInOwner);
//   } catch (error) {
//     console.log("Error in login:", error);
//   }
// };

// const logout = async (req, res) => {
//   try {
//     const options = {
//       httpOnly: true,
//       secure: true,
//     };
//     return res
//       .status(200)
//       .clearCookie("token", options)
//       .json({ message: "User logout successfully" });
//   } catch (error) {
//     console.log("Error in login:", error);
//   }
// };

// const checkAuth = async (req, res) => {
//   try {
//     const owner = req.owner;
//     return res.status(200).json(owner);
//   } catch (error) {
//     console.log("Error in login:", error);
//   }
// };

// const getOwners = async (req, res) => {
//   try {
//     const owners = await Owner.find();
//     return res.status(200).json(owners);
//   } catch (error) {
//     console.log("Error in login:", error);
//   }
// };

// export {signup, login, logout, checkAuth, getOwners};