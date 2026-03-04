const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    projectCode: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      default: "General"
    },

    date: {
      type: Date,
      default: Date.now
    },

    addedBy: {
      type: String // email or name
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);