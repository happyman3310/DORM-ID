// backend/controllers/profileController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');

// Получение данных профиля
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Обновление данных профиля
exports.updateProfile = async (req, res) => {
  const { username, email, biography } = req.body;
  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    let user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    // Обновляем данные пользователя
    user.username = username || user.username;
    user.email = email || user.email;
    user.biography = biography || user.biography;
    user.avatarUrl = avatarUrl || user.avatarUrl;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Удаление аккаунта пользователя
// backend/controllers/profileController.js
exports.deleteProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    await user.remove();

    res.json({ msg: 'Аккаунт успешно удален' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// frontend/src/components/Profile.js
<button onClick={async () => {
  if (window.confirm('Вы уверены, что хотите удалить аккаунт?')) {
    try {
      await deleteProfile(token);
      alert('Аккаунт успешно удален');
      setToken(null); // Выход из системы после удаления аккаунта
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
    }
}}>Удалить аккаунт</button>