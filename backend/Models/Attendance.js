const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    labourType: {
        type: String,
        required: true,
    },
    workers: {
        type: Number,
        required: true,
        default: 0
    },
    wage: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const AttendanceModel = mongoose.model('attendances', AttendanceSchema);
module.exports = AttendanceModel;
