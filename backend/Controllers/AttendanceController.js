const AttendanceModel = require("../Models/Attendance");

const addAttendance = async (req, res) => {
    try {
        const { entries } = req.body;
        // Check if entries exists and is an array
        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            return res.status(400).json({
                message: "No attendance entries provided or malformed request format",
                success: false
            });
        }

        // Insert multiple independent documents
        const savedAttendances = await AttendanceModel.insertMany(entries);
        
        return res.status(201).json({
            message: "Attendance records added successfully",
            success: true,
            data: savedAttendances
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error while saving attendance",
            success: false,
            error: err
        });
    }
};

const getAttendance = async (req, res) => {
    try {
        // Fetch all attendance records sorted by newest first
        const records = await AttendanceModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Retrieved all attendance records",
            success: true,
            data: records
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error while fetching attendance",
            success: false,
            error: err
        });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const { date, labourType, workers, wage, total } = req.body;
        
        const updatedRecord = await AttendanceModel.findByIdAndUpdate(
            id,
            { date, labourType, workers, wage, total },
            { new: true } // Returns the modified document
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Attendance record not found", success: false });
        }

        return res.status(200).json({
            message: "Attendance updated successfully",
            success: true,
            data: updatedRecord
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error while updating attendance",
            success: false,
            error: err
        });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRecord = await AttendanceModel.findByIdAndDelete(id);
        
        if (!deletedRecord) {
            return res.status(404).json({ message: "Attendance record not found", success: false });
        }

        return res.status(200).json({
            message: "Attendance deleted successfully",
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error while deleting attendance",
            success: false,
            error: err
        });
    }
};

module.exports = {
    addAttendance,
    getAttendance,
    updateAttendance,
    deleteAttendance
};
