import { Checklist } from "../models/checklist.models.js";

const getChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find({
      createdBy: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });
    res.status(200).json({ data:checklists });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch checklists" });
  }
};

const createChecklist = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const newChecklist = await Checklist.create({
      title,
      createdBy: req.user._id,
      priority,
      dueDate,
    });

    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create checklist" });
  }
};

const updateChecklist = async (req, res) => {
  try {
    const { id } = req.params;

    const checklist = await Checklist.findOne({_id: id, createdBy: req.user._id})
  
    if (!checklist) return res.status(404).json({ message: "Checklist not found" });

    await Checklist.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      {checked: !checklist.checked},
      { new: true }
    );


    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update checklist" });
  }
};

const deleteChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const checklist = await Checklist.findByIdAndDelete(id)

    res.status(200).json({ message: "Checklist deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete checklist" });
  }
};

export {getChecklists, createChecklist, updateChecklist, deleteChecklist };