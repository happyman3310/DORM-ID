// frontend/src/components/WidgetSelector.js
import React, { useState } from 'react';

const WidgetSelector = ({ onAddWidget }) => {
  const [selectedWidget, setSelectedWidget] = useState('');

  const handleSelectChange = (e) => {
    setSelectedWidget(e.target.value);
  };

  const handleAddWidget = () => {
    if (selectedWidget) {
      onAddWidget(selectedWidget);
      setSelectedWidget('');
    }
  };

  return (
    <div className="widget-selector">
      <select value={selectedWidget} onChange={handleSelectChange}>
        <option value="">Выберите виджет</option>
        <option value="courses">Курсы</option>
        <option value="challenges">Челленджи</option>
        {/* Добавьте другие виджеты здесь */}
      </select>
      <button onClick={handleAddWidget}>Добавить виджет</button>
    </div>
  );
};

export default WidgetSelector;