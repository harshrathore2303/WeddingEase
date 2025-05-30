import { User } from "../models/user.models.js";
import { Checklist } from "../models/checklist.models.js";
import { Task } from "../models/task.models.js";

const addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newCategory = await Checklist.create({ title });
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { checkList: newCategory._id } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { description, done_by } = req.body;

    if (!description)
      return res.status(400).json({ message: "Task description is required" });

    const newTask = await Task.create({ description, done_by });
    // to be updated soon. logical flaw
    await Checklist.findByIdAndUpdate(
      categoryId,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllChecks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "checkList",
      populate: { path: "tasks" },
    });

    return res.status(200).json(user.checkList);
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Checklist.findByIdAndDelete(categoryId);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });

    await User.updateMany({}, { $pull: { checkList: categoryId } });
    await Task.deleteMany({ _id: { $in: deletedCategory.tasks } });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { categoryId, taskId } = req.params;
    await Checklist.findByIdAndUpdate(
      categoryId,
      { $pull: { tasks: taskId } },
      { new: true }
    );
    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addCategory, addTask, getAllChecks, deleteCategory, deleteTask };
