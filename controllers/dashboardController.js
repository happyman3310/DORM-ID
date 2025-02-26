// backend/controllers/dashboardController.js
const DashboardSettings = require('../models/DashboardSettings');
const User = require('../models/User');

// Получение настроек дашборда пользователя
exports.getDashboardSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('dashboardSettings');
    if (!user || !user.dashboardSettings) {
      return res.status(404).json({ msg: 'Настройки дашборда не найдены' });
    }
    res.json(user.dashboardSettings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Обновление настроек дашборда пользователя
exports.updateDashboardSettings = async (req, res) => {
  const { widgets } = req.body;

  try {
    let user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    let dashboardSettings = await DashboardSettings.findOne({ userId: user.id });

    if (!dashboardSettings) {
      dashboardSettings = new DashboardSettings({
        userId: user.id,
        widgets: [],
      });
    }

    dashboardSettings.widgets = widgets;

    await dashboardSettings.save();
    user.dashboardSettings = dashboardSettings;
    await user.save();

    res.json(dashboardSettings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Удаление настроек дашборда пользователя
exports.deleteDashboardSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user || !user.dashboardSettings) {
      return res.status(404).json({ msg: 'Настройки дашборда не найдены' });
    }

    await DashboardSettings.findByIdAndDelete(user.dashboardSettings);

    user.dashboardSettings = null;
    await user.save();

    res.json({ msg: 'Настройки дашборда успешно удалены' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка сервера');
  }
};