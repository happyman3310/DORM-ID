// backend/controllers/achievementController.js
const Achievement = require('../models/Achievement');

// Получение списка всех ачивок
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Создание новой ачивки
exports.createAchievement = async (req, res) => {
  const { title, description, xpRequired } = req.body;

  try {
    const newAchievement = new Achievement({
      title,
      description,
      xpRequired,
    });

    const achievement = await newAchievement.save();
    res.json(achievement);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};