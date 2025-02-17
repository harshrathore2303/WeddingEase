import { User } from "../models/user.models.js";
import { Guest } from "../models/guest.models.js";

const addGuest = async (req, res) => {
  try {
    const { title } = req.body;

    const titleExist = await Guest.findOne({ $or: [{ title }] });

    if (titleExist) {
      return res.status(404).json({ message: "title already exist" });
    }
    const guest = await Guest.create({
      title,
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { guestList: guest._id } },
      { new: true }
    );
    console.log(updatedUser);
    return res.json({ message: "success" });
  } catch (error) {
    console.log("Error::", error);
  }
};

const getAllGuest = async (req, res) => {
  try {
    const guest = await User.findOne({ email: req.user.email }).populate(
      "guestList"
    );
    return res.json(guest.guestList);
  } catch (error) {
    console.log("Error::", error);
  }
};

const addGuestDetail = async (req, res) => {
  try {
    const title = req.params.title;
    const { name, email, phone, event } = req.body;  

    const user = await User.findOne({ email: req.user.email }).populate("guestList");
    const titleExist = user.guestList.filter((category) => category.title === title);
    
    if (!titleExist){
      throw new Error("title is already present");
    }
    
    titleExist[0].guests.push({name, email, phone});
    await titleExist[0].save();
    
    return res.status(201).json({message: "successfull added details"});
  } catch (error) {
    console.log("Error::", error);
  }
};

const addEventToGuest = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}


const deleteList = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

const deleteGuest = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}




export { addGuest, getAllGuest, addGuestDetail,addEventToGuest, deleteList, deleteGuest };
