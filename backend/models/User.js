const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notificationPreferences: {
    onAssignment: {
      type: Boolean,
      default: true,
    },
    onComment: {
      type: Boolean,
      default: true,
    },
    onDueDate: {
      type: Boolean,
      default: true,
    },
    onCardMove: {
      type: Boolean,
      default: false,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
