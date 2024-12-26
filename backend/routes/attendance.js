const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.post('/mark', async (req, res) => {
    const { userId } = req.body;
    const date = new Date().toISOString().split('T')[0];

    const existingAttendance = await Attendance.findOne({ userId, date });
    if (existingAttendance) {
        return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    const attendance = new Attendance({ userId });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked' });
});

router.get('/view/:userId', async (req, res) => {
    const { userId } = req.params;
    const attendanceRecords = await Attendance.find({ userId });
    res.json(attendanceRecords);
});

module.exports = router;
