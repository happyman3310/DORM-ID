// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/profileService';
import { getUserLevelAndXP, addXP } from '../services/userService';
import Dashboard from './Dashboard'; // Импорт компонента дашборда
import './styles/App.css'; // Подключаем стили

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    biography: '',
    avatarUrl: '',
  });

  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
        setFormData({
          username: data.username,
          email: data.email,
          biography: data.biography,
          avatarUrl: data.avatarUrl,
        });
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    };

    const fetchUserLevelAndXP = async () => {
      try {
        const data = await getUserLevelAndXP(token);
        setXP(data.xp);
        setLevel(data.level);
      } catch (error) {
        console.error('Ошибка при получении уровня и XP:', error);
      }
    };

    if (token) {
      fetchProfile();
      fetchUserLevelAndXP();

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatarUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('username', formData.username);
      formDataWithFile.append('email', formData.email);
      formDataWithFile.append('biography', formData.biography);
      if (formData.avatarUrl.startsWith('data:image')) {
        const blob = await fetch(formData.avatarUrl).then(res => res.blob());
        const file = new File([blob], 'avatar.png', { type: 'image/png' });
        formDataWithFile.append('avatar', file);
      }

      const updatedProfile = await updateProfile(token, formDataWithFile);
      setProfile(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  const handleAddXP = async (amount) => {
    try {
      const updatedUser = await addXP(token, amount);
      setXP(updatedUser.xp);
      setLevel(updatedUser.level);
      alert(`XP успешно добавлены! Текущий уровень: ${updatedUser.level}, XP: ${updatedUser.xp}`);
    } catch (error) {
      console.error('Ошибка при добавлении XP:', error);
    }
  };

  return (
    <div className="profile">
      <h2>Профиль</h2>
      {profile ? (
        editing ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Биография</label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Аватарка</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {formData.avatarUrl && <img src={formData.avatarUrl} alt="Avatar Preview" />}
            <button type="submit">Сохранить изменения</button>
          </form>
        ) : (
          <div>
            {profile.avatarUrl && <img src={profile.avatarUrl} alt="Avatar" />}
            <h3>{profile.username}</h3>
            <p>Email: {profile.email}</p>
            <p>Биография: {profile.biography}</p>
            <button onClick={() => setEditing(true)}>Редактировать профиль</button>
            <h4>Уровень: {level}</h4>
            <h4>XP: {xp}</h4>
            <button onClick={() => setEditing(true)}>
            <button onClick={() => handleAddXP(100)}>Добавить 100 XP</button>
            <Dashboard token={token} /> {/* Добавляем дашборд для выбора мини-приложений */}
          </div>
        )
      ) : (
        <p>Загрузка профиля...</p>
      )}
    </div>
  );
};

export default Profile;