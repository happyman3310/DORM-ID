// backend/routes/miniAppRoutes.js
const express = require('express');
const { getMiniApps, activateMiniApp } = require('../controllers/miniAppController');
const router = express.Router();

// Получение списка всех мини-приложений
router.get('/', getMiniApps);

// Активация мини-приложения для пользователя
router.post('/activate', activateMiniApp);

module.exports = router;