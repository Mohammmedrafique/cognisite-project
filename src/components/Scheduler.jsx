// // src/components/Scheduler.js

// import React, { useState } from 'react';

// const Scheduler = () => {
//   const [width, setWidth] = useState('');
//   const [height, setHeight] = useState('');
//   const [masons, setMasons] = useState('');
//   const [result, setResult] = useState(null);

//   const handleCalculate = () => {
//     const totalSquareFeet = width * height;
//     const daysRequired = Math.ceil(totalSquareFeet / (25 * masons));
//     const today = new Date();
//     const completionDate = new Date(today.setDate(today.getDate() + daysRequired));

//     setResult({
//       totalSquareFeet,
//       daysRequired,
//       completionDate: completionDate.toDateString(),
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Construction Scheduler</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Width (feet): </label>
//         <input
//           type="number"
//           value={width}
//           onChange={(e) => setWidth(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Height (feet): </label>
//         <input
//           type="number"
//           value={height}
//           onChange={(e) => setHeight(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Number of Masons: </label>
//         <input
//           type="number"
//           value={masons}
//           onChange={(e) => setMasons(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <button
//         onClick={handleCalculate}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         Calculate
//       </button>

//       {result && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           <h2 className="text-xl font-semibold">Results</h2>
//           <p>Total Square Feet: {result.totalSquareFeet}</p>
//           <p>Days Required: {result.daysRequired}</p>
//           <p>Completion Date: {result.completionDate}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Scheduler;
// src/components/Scheduler.js

import { useState } from "react";
import GanttChart from "./GanttChart";

const Scheduler = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [masons, setMasons] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const totalSquareFeet = width * height;
    const daysRequired = Math.ceil(totalSquareFeet / (25 * masons));
    const today = new Date();
    const completionDate = new Date(
      today.setDate(today.getDate() + daysRequired)
    );

    setResult({
      totalSquareFeet,
      daysRequired,
      completionDate: completionDate.toDateString(),
    });

    // Prepare tasks for Gantt chart
    const tasks = [
      {
        start: new Date(),
        end: completionDate,
        name: "Construction",
        id: "Task 1",
        type: "task",
        progress: 0,
        isDisabled: false,
        project: "",
        styles: {
          progressColor: "limegreen",
          progressSelectedColor: "limegreen",
        },
      },
    ];

    setTasks(tasks);
  };

  const [tasks, setTasks] = useState([]);

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Construction Scheduler
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Width (feet):{" "}
          </label>
          <input
            type="number"
            value={width}
            required
            onChange={(e) => setWidth(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Height (feet):{" "}
          </label>
          <input
            type="number"
            value={height}
            required
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Masons:{" "}
          </label>
          <input
            type="number"
            value={masons}
            required
            onChange={(e) => setMasons(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Results
          </h2>
          <div className="text-gray-700">
            <p className="mb-2">
              <span className="font-bold">Total Square Feet:</span>{" "}
              {result.totalSquareFeet}
            </p>
            <p className="mb-2">
              <span className="font-bold">Days Required:</span>{" "}
              {result.daysRequired}
            </p>
            <p className="mb-2">
              <span className="font-bold">Completion Date:</span>{" "}
              {result.completionDate}
            </p>
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Gantt Chart
          </h2>
          <GanttChart tasks={tasks} />
        </div>
      )}
    </div>
  );
};

export default Scheduler;
