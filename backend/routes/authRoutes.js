const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  updateNotificationPreferences,
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateProfile);
router.put('/users/:id/password', changePassword);
router.put('/users/:id/notifications', updateNotificationPreferences);

module.exports = router;