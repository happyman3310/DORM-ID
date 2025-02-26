// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const profileRoutes = require('./routes/profileRoutes');
const miniAppRoutes = require('./routes/miniAppRoutes'); // Новый маршрут для мини-приложений
const dashboardRoutes = require('./routes/dashboardRoutes'); // Новый маршрут для дашборда

// Загрузка переменных окружения
dotenv.config({ path: './config/.env' });

// Подключение к базе данных
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Сессии
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/profile', profileRoutes); // Новый маршрут для профиля
app.use('/api/mini-apps', miniAppRoutes); // Новый маршрут для мини-приложений
app.use('/api/dashboard', dashboardRoutes); // Новый маршрут для дашборда

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));