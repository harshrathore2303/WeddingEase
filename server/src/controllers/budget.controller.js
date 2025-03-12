import { User } from "../models/user.models.js";
import { Budget } from "../models/budget.models.js";

const getBudget = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "budget"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    return res.status(200).json(user.budget);
  } catch (error) {
    console.log("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBudget = async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title.trim() || !amount) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }
    const user = await User.findOne({ email: req.user.email }).populate(
      "budget"
    );

    const existBudget = user.budget.some((b) => b.title === title);
    if (existBudget) {
      return res.status(400).json({ message: "Budget already exists" });
    }

    const newBudget = await Budget.create({ title, amount });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { budget: newBudget._id } },
      { new: true }
    );

    return res.status(201).json({ updatedUser });
  } catch (error) {
    console.log("Error::", error);
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { budget: budgetId } },
      { new: true }
    );

    await Budget.findByIdAndDelete(budgetId);

    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.log("error::", error);
  }
};

export { getBudget, addBudget, deleteBudget };
