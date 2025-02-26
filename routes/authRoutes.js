// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Регистрация нового пользователя
router.post('/register', register);

// Авторизация пользователя
router.post('/login', login);

// Google OAuth2
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // успешная аутентификация, перенаправляем на главную страницу или другую
    res.redirect('http://localhost:3306'); // Перенаправление на фронтенд
  }
);

// Facebook OAuth2
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // успешная аутентификация, перенаправляем на главную страницу или другую
    res.redirect('http://localhost:3306'); // Перенаправление на фронтенд
  }
);

module.exports = router;