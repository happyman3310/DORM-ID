// backend/routes/dashboardRoutes.js
const express = require('express');
const { getDashboardSettings, updateDashboardSettings, deleteDashboardSettings } = require('../controllers/dashboardController');
const router = express.Router();

// Получение настроек дашборда пользователя
router.get('/', getDashboardSettings);

// Обновление настроек дашборда пользователя
router.put('/', updateDashboardSettings);

// Удаление настроек дашборда пользователя
router.delete('/', deleteDashboardSettings);

module.exports = router;