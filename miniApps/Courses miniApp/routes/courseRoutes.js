// backend/routes/courseRoutes.js
const express = require('express');
const { getCourses, getCourseById, createCourse } = require('../controllers/courseController');

const router = express.Router();

// Получение списка всех курсов
router.get('/', getCourses);

// Получение конкретного курса по ID
router.get('/:id', getCourseById);

// Создание нового курса
router.post('/', createCourse);

module.exports = router;