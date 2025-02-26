// frontend/src/components/Widget.js
import React from 'react';
import { DragHandle } from 'react-beautiful-dnd';

const Widget = ({ widget, token }) => {
  const WidgetComponent = widget.component;

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.widgetId}</h3>
        <button onClick={() => console.log('Remove widget')}>Удалить</button>
      </div>
      <div className="widget-content">
        {WidgetComponent ? <WidgetComponent token={token} /> : <p>Виджет не найден</p>}
      </div>
    </div>
  );
};

export default Widget;