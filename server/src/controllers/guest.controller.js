import { User } from "../models/user.models.js";
import { Guest } from "../models/guest.models.js";
import { Event } from "../models/event.models.js";

const addGroup = async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.user._id;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "No title provided" });
    }

    const exist = await Guest.findOne({title, createdBy: id});
    if (exist){
      return res.status(400).json({message: "Already exist"});
    }

    const guest = await Guest.create({ title, createdBy: id });

    return res.status(201).json({ message: "Successfully created title" });
  } catch (error) {
    console.log("err::", error);
    return res.status(500).json({ message: "Intenal Server Error" });
  }
};

const getData = async (req, res) => {
  try {
    const id = req.user._id;
    const guests = await Guest.find({createdBy: id});

    return res.status(200).json({ guests });
  } catch (error) {
    console.error("getGroup error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addGuest = async (req, res) => {
  try {
    const { title, name, phone, email } = req.body;
    const id = req.user._id;

    const guests = await Guest.findOne({ createdBy: id, title });

    const checkDulicate = guests.guests.find((g) => g.phone == phone || g.email == email);
    if (checkDulicate){
      return res.status(409).json({message: "Guest with this phone or email already exists" });
    }

    const newGuests = await Guest.findByIdAndUpdate(guests._id, {
      $push: {guests: {name, phone, email}}
    }, {new: true})

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const id = req.user._id;

    const group = await Guest.findOneAndDelete({ _id: groupId, createdBy: id });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("deleteGroup error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteGuest = async (req, res) => {
  try {
    const { groupId, guestId } = req.params;

    const group = await Guest.findByIdAndUpdate(
      groupId,
      { $pull: { guests: { _id: guestId } } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error("deleteGuest error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  addGuest,
  deleteGuest,
  getData,
  addGroup,
  deleteGroup
};
