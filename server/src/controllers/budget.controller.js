import { User } from "../models/user.models.js";
import { Budget } from "../models/budget.models.js";

const getBudget = async (req, res) => {
  try {
    const id = req.user._id;
    const budgets = await Budget.find({createdBy: id});

    if (!budgets || budgets.length === 0) {
      return res.status(404).json({ message: "No budgets found" });
    }
    return res.status(200).json({ message: "Budgets fetched successfully", data: budgets });
  } catch (error) {
    console.log("Error::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBudget = async (req, res) => {
  try {
    const id = req.user._id;
    const { title, amount } = req.body;

    if (!title.trim() || !amount) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }
    const existBudget = await Budget.findOne({title, createdBy:id});
    if (existBudget) {
      return res.status(400).json({ message: "Budget already exists" });
    }

    const newBudget = await Budget.create({ title, amount, createdBy: id });

    return res.status(201).json({ message: "Budget Added" });
  } catch (error) {
    console.log("Error::", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const budget = await Budget.findByIdAndDelete(budgetId);

    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    // console.log("error::", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget item not found" });
    }
    const checked = budget.checked;
    await Budget.findByIdAndUpdate(id, { checked: !checked });

    return res.status(200).json({ message: "Budget item updated" });
  } catch (error) {
    console.log("error::", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getBudget, addBudget, deleteBudget, updateBudget };
