const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../Middleware/Auth");
const roleCheck = require("../Middleware/roleCheck");

const {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getSingleExpense
} = require("../Controllers/ExpenseController");


// ADD
router.post(
  "/add",
  ensureAuthenticated,
  roleCheck("admin", "manager"),
  addExpense
);


// VIEW ALL  (MUST COME BEFORE :id)
router.get(
  "/all",
  ensureAuthenticated,
  roleCheck("admin", "manager"),
  getAllExpenses
);


// GET SINGLE (ALWAYS LAST GET ROUTE)
router.get(
  "/:id",
  ensureAuthenticated,
  roleCheck("admin","manager"),
  getSingleExpense
);


// UPDATE
router.put(
  "/update/:id",
  ensureAuthenticated,
  roleCheck("admin", "manager"),
  updateExpense
);


// DELETE
router.delete(
  "/delete/:id",
  ensureAuthenticated,
  roleCheck("admin","manager"),
  deleteExpense
);

module.exports = router;
