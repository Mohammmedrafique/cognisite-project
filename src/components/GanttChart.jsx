// src/components/GanttChart.js
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const GanttChart = ({ tasks }) => {
  return (
    <div>
      <Gantt tasks={tasks} viewMode={ViewMode.Day} />
    </div>
  );
};

export default GanttChart;
