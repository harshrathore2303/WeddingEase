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
    return res.status(500).json({ message: "Internal Server Error" });
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addGuestDetail = async (req, res) => {
  try {
    const title = req.params.title;
    const { name, email, phone, event } = req.body;

    const user = await User.findOne({ email: req.user.email }).populate(
      "guestList"
    );
    // console.log("USerrrr", user);
    const titleExist = user.guestList.filter(
      (category) => category.title === title
    );

    // console.log("titleExisttttttttt",titleExist);
    if (!titleExist) {
      throw new Error("title is already present");
    }

    titleExist[0].guests.push({ name, email, phone });
    await titleExist[0].save();

    return res.status(201).json({ message: "successfull added details" });
  } catch (error) {
    console.log("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addEventToGuest = async (req, res) => {
  try {
    const { title, guestId } = req.params;
    const { eventId } = req.body;

    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ message: "Event not found" });
    }

    const guestCategory = await Guest.findOne({ title });
    if (!guestCategory) {
      return res.status(404).json({ message: "Guest category not found" });
    }

    const guest = guestCategory.guests.find(
      (g) => g._id.toString() === guestId
    );
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    if (guest.event.includes(eventId)) {
      return res
        .status(400)
        .json({ message: "Event already assigned to this guest" });
    }

    guest.event.push(eventId);
    await guestCategory.save();

    return res
      .status(200)
      .json({ message: "Event successfully added to guest", guest });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEventFromGuest = async (req, res) => {
  try {
    const { title, guestId } = req.params;
    const { eventId } = req.body;

    const guestCategory = await Guest.findOne({ title });
    if (!guestCategory) {
      return res.status(404).json({ message: "Guest category not found" });
    }

    const guest = guestCategory.guests.find(
      (g) => g._id.toString() === guestId
    );
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    const eventIndex = guest.event.indexOf(eventId);
    if (eventIndex === -1) {
      return res
        .status(404)
        .json({ message: "Event not found in guest's list" });
    }

    guest.event.splice(eventIndex, 1);
    await guestCategory.save();

    return res
      .status(200)
      .json({ message: "Event successfully deleted from guest", guest });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteList = async (req, res) => {
  try {
    const { titleId } = req.params;

    const deletedGuestList = await Guest.findByIdAndDelete(titleId);
    if (!deletedGuestList) {
      return res.status(404).json({ message: "Guest list not found" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { guestList: titleId } },
      { new: true }
    );

    return res.status(200).json({ message: "Guest list deleted successfully" });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteGuest = async (req, res) => {
  try {
    const { titleId, guestId } = req.params;

    const updatedGuestCategory = await Guest.findByIdAndUpdate(
      titleId,
      { $pull: { guests: { _id: guestId } } },
      { new: true }
    );

    if (!updatedGuestCategory) {
      return res.status(404).json({ message: "Guest category not found" });
    }

    return res.status(200).json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  addGuest,
  getAllGuest,
  addGuestDetail,
  addEventToGuest,
  deleteList,
  deleteGuest,
  deleteEventFromGuest,
};
