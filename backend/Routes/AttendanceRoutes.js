const express = require("express");
const {
    addAttendance,
    getAttendance,
    updateAttendance,
    deleteAttendance
} = require("../Controllers/AttendanceController");

const router = express.Router();

// GET all past records
router.get("/", getAttendance);

// POST new independent records in bulk
router.post("/", addAttendance);

// PUT update a specific record independently
router.put("/:id", updateAttendance);

// DELETE a specific record
router.delete("/:id", deleteAttendance);

module.exports = router;
