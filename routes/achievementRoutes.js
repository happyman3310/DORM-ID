// backend/routes/achievementRoutes.js
const express = require('express');
const { getAchievements, createAchievement } = require('../controllers/achievementController');

const router = express.Router();

// Получение списка всех ачивок
router.get('/', getAchievements);

// Создание новой ачивки
router.post('/', createAchievement);

module.exports = router;