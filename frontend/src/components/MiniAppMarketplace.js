// frontend/src/components/MiniAppMarketplace.js
import React, { useEffect, useState } from 'react';
import { getMiniApps, activateMiniApp } from '../services/miniAppService';

const MiniAppMarketplace = ({ token }) => {
  const [miniApps, setMiniApps] = useState([]);

  useEffect(() => {
    const fetchMiniApps = async () => {
      try {
        const data = await getMiniApps(token);
        setMiniApps(data);
      } catch (error) {
        console.error('Ошибка при получении мини-приложений:', error);
      }
    };

    if (token) {
      fetchMiniApps();
    }
  }, [token]);

  const handleActivateMiniApp = async (miniAppId) => {
    try {
      await activateMiniApp(token, miniAppId);
      alert('Мини-приложение успешно активировано');
    } catch (error) {
      console.error('Ошибка при активации мини-приложения:', error);
    }
  };

  return (
    <div>
      <h2>Маркетплейс мини-приложений</h2>
      <ul>
        {miniApps.map((miniApp) => (
          <li key={miniApp._id}>
            <h3>{miniApp.name}</h3>
            <p>{miniApp.description}</p>
            {miniApp.iconUrl && <img src={miniApp.iconUrl} alt="MiniApp Icon" style={{ width: '50px', height: '50px' }} />}
            <button onClick={() => handleActivateMiniApp(miniApp._id)}>Активировать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniAppMarketplace;