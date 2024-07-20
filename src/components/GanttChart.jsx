import { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import 'frappe-gantt/dist/frappe-gantt.css';

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef();

  useEffect(() => {
    if (ganttRef.current) {
      new Gantt(ganttRef.current, tasks, {
        on_click: (task) => {
          console.log(task);
        },
        on_date_change: (task, start, end) => {
          console.log(task, start, end);
        },
        on_progress_change: (task, progress) => {
          console.log(task, progress);
        },
        on_view_change: (mode) => {
          console.log(mode);
        },
      });
    }
  }, [tasks]);

  return <svg ref={ganttRef}></svg>;
};

export default GanttChart;
