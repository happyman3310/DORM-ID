// frontend/src/components/SocialAuthButtons.js
import React from 'react';
import './styles/App.css'; // Подключаем стили

const SocialAuthButtons = () => {
  return (
    <div>
      <h3>Авторизация через социальные сети</h3>
      <a href="/api/auth/google" className="btn">Google</a>
      <a href="/api/auth/facebook" className="btn btn-facebook">Facebook</a>
    </div>
  );
};

export default SocialAuthButtons;