const Expense = require("../Models/Expense");


// ✅ 1. ADD Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // projectCode comes from JWT
    const projectCode = req.user.projectCode;

    const newExpense = await Expense.create({
      projectCode,
      title,
      amount,
      category,
      addedBy: req.user.email
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense: newExpense
    });

  } catch (err) {
    console.log("Add Expense Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



// ✅ 2. GET All Expenses (Only for that Project)
const getAllExpenses = async (req, res) => {
  try {
    const projectCode = req.user.projectCode;

    const expenses = await Expense.find({ projectCode })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      expenses
    });

  } catch (err) {
    console.log("Get Expenses Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



// ✅ 3. UPDATE Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense
    });

  } catch (err) {
    console.log("Update Expense Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ✅ 5. GET Single Expense
const getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      _id: id,
      projectCode: req.user.projectCode
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      expense
    });

  } catch (err) {
    console.log("Get Single Expense Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};










// ✅ 4. DELETE Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });

  } catch (err) {
    console.log("Delete Expense Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



// ✅ Export All Controllers
module.exports = {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getSingleExpense
};