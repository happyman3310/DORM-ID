// backend/controllers/courseController.js
const Course = require('../models/Course');

// Получение списка всех курсов
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Получение конкретного курса по ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Курс не найден' });
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Создание нового курса
exports.createCourse = async (req, res) => {
  const { title, description, xp, questions } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      xp,
      questions,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};