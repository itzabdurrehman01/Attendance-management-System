const Attendance = require('../models/Attendance');

const markAttendance = async (req, res) => {
    const { userId } = req.body; 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingRecord = await Attendance.findOne({
        userId,
        date: { $gte: today }
    });

    if (existingRecord) {
        return res.status(400).json({ message: 'Attendance already marked for today.' });
    }

    const attendance = new Attendance({ userId, status: 'present' });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully.' });

    const calculateGrade = (attendanceCount) => {
        if (attendanceCount >= 26) return 'A';
        if (attendanceCount >= 20) return 'B';
        if (attendanceCount >= 15) return 'C';
        if (attendanceCount >= 10) return 'D';
        return 'F';
      };
      
};
