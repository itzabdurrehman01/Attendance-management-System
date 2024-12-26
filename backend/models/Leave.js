const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  reason: { type: String, required: true },
  dateRequested: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Leave', LeaveSchema);
