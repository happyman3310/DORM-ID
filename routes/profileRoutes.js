// backend/routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const upload = require('../config/multer');
const router = express.Router();

// Получение данных профиля
router.get('/', getProfile);

// Обновление данных профиля
router.put('/', upload.single('avatar'), updateProfile);

// Удаление аккаунта пользователя
router.delete('/', deleteProfile);

module.exports = router;