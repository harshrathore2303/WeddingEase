import { User } from "../models/user.models.js";
import { Guest } from "../models/guest.models.js";
import { Event } from "../models/event.models.js";

const addEvent = async (req, res) => {
  try {
    const { title } = req.body;

    if (title.trim() === "") {
      return res.status(400).json({ message: "title not found" });
    }
    //problem to be solve
    const titleExist = await Event.findOne({ $or: [{ title }] });
    if (titleExist) {
      return res.status(404).json({ message: "title already exist" });
    }
    const event = await Event.create({ title });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { events: event._id } },
      { new: true }
    );
    console.log(updatedUser);
    return res.status(201).json({ message: "Event created" });
  } catch (error) {
    console.log("Error::", error);
  }
};

const getAllEvent = async (req, res) => {
  try {
    const events = await User.findOne({ email: req.user.email }).populate(
      "events"
    );
    console.log(events);
    return res.status(200).json(events.events);
  } catch (error) {
    console.log("Error::", error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addEvent, getAllEvent, deleteEvent };
