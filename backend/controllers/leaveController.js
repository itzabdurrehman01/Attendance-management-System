const LeaveRequest = require('../models/LeaveRequest'); 

const requestLeave = async (req, res) => {
    const { userId, reason } = req.body;
    const leaveRequest = new LeaveRequest({ userId, reason });
    await leaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully.' });
};

module.exports = { requestLeave };
