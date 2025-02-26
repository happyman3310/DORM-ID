// backend/controllers/miniAppController.js
const MiniApp = require('../models/MiniApp');
const User = require('../models/User');

// Получение списка всех мини-приложений
exports.getMiniApps = async (req, res) => {
  try {
    const miniApps = await MiniApp.find();
    res.json(miniApps);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Активация мини-приложения для пользователя
exports.activateMiniApp = async (req, res) => {
  const { miniAppId } = req.body;
  const userId = req.user.userId;

  try {
    let user = await User.findById(userId);
    let miniApp = await MiniApp.findById(miniAppId);

    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    if (!miniApp) {
      return res.status(404).json({ msg: 'Мини-приложение не найдено' });
    }

    if (user.activeMiniApps.includes(miniAppId)) {
      return res.status(400).json({ msg: 'Мини-приложение уже активировано' });
    }

    user.activeMiniApps.push(miniAppId);
    miniApp.users.push(user.id);

    await user.save();
    await miniApp.save();

    res.json({ msg: 'Мини-приложение успешно активировано' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};