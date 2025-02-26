// frontend/src/components/AchievementList.js
import React, { useEffect, useState } from 'react';
import { getAchievements } from '../services/achievementService';

const AchievementList = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Ошибка при получении ачивок:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div>
      <h2>Список ачивок</h2>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement._id}>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <p>XP Required: {achievement.xpRequired}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementList;