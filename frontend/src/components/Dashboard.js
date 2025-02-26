// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getDashboardSettings, updateDashboardSettings } from '../services/dashboardService';
import LazyCourseList from '../../src/mini-apps/CoursesApp/components/CourseList'; // Ленивая загрузка мини-приложения "Курсы"
import LazyChallengeList from '../../src/mini-apps/ChallengesApp/components/ChallengeList'; // Ленивая загрузка мини-приложения "Челленджи"
import WidgetSelector from './WidgetSelector'; // Импорт компонента для выбора виджетов
import Widget from './Widget'; // Импорт компонента для отдельного виджета
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles/App.css'; // Подключаем стили

const getWidgetComponent = (widgetId) => {
  switch (widgetId) {
    case 'courses':
      return LazyCourseList;
    case 'challenges':
      return LazyChallengeList;
    default:
      return null;
  }
};

const Dashboard = ({ token }) => {
  const [dashboardSettings, setDashboardSettings] = useState([]);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const fetchDashboardSettings = async () => {
      try {
        const data = await getDashboardSettings(token);
        setDashboardSettings(data);
        setWidgets(data.widgets.map(widget => ({
          ...widget,
          component: getWidgetComponent(widget.widgetId),
        })));
      } catch (error) {
        console.error('Ошибка при получении настроек дашборда:', error);
      }
    };

    if (token) {
      fetchDashboardSettings();
    }
  }, [token]);




  const getWidgetComponent = (widgetId) => {
    switch (widgetId) {
      case 'courses':
        return LazyCourseList;
      case 'challenges':
        return LazyChallengeList;
      default:
        return null;
    }
  };

  const handleAddWidget = (widgetId) => {
    const newWidget = {
      widgetId,
      position: { x: 0, y: 0, width: 1, height: 1 }, // Значения по умолчанию для позиции
    };

    setWidgets([...widgets, { ...newWidget, component: getWidgetComponent(widgetId) }]);
    handleUpdateWidgets([...widgets, newWidget]);
  };

  const handleUpdateWidgets = async (newWidgets) => {
    try {
      const updatedSettings = await updateDashboardSettings(token, newWidgets);
      setDashboardSettings(updatedSettings);
    } catch (error) {
      console.error('Ошибка при обновлении виджетов:', error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
    handleUpdateWidgets(items.map(item => item.widgetId));
  };
  
  const handleUpdateWidgets = async (newWidgets) => {
    try {
      const updatedSettings = await updateDashboardSettings(token, newWidgets);
      setDashboardSettings(updatedSettings);
      setWidgets(newWidgets.map(widget => ({
        ...widget,
        component: getWidgetComponent(widget.widgetId),
      })));
    } catch (error) {
      console.error('Ошибка при обновлении виджетов:', error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(dashboardSettings.widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleUpdateWidgets(items);
  };

  return (
    <div className="dashboard">
      <h2>Дашборд</h2>
      <div className="widgets-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
        {widgets.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="widgets" direction="horizontal" type="WIDGET">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {widgets.map((widget, index) => (
                    <Draggable key={widget.widgetId} draggableId={widget.widgetId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginBottom: '10px',
                          }}
                        >
                          {React.createElement(widget.component, { token })}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>Нет активных виджетов на дашборде.</p>
        )}
      </div>
      {/* Здесь можно добавить кнопку или форму для добавления новых виджетов */}
    </div>
  );
};

export default Dashboard;