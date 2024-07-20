import { useState } from "react";
import GanttChart from "./GanttChart";

const Scheduler = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [masons, setMasons] = useState("");
  const [result, setResult] = useState(null);
  const [tasks, setTasks] = useState([]);

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

    const taskStartDate = new Date().toISOString().split("T")[0];
    const taskEndDate = completionDate.toISOString().split("T")[0];

    const tasks = [
      {
        id: "Task 1",
        name: "Construction",
        start: taskStartDate,
        end: taskEndDate,
        progress: 0,
      },
    ];

    setTasks(tasks);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Construction Scheduler
          </h1>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Width (feet)
              </label>
              <input
                type="number"
                value={width}
                required
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter width"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Height (feet)
              </label>
              <input
                type="number"
                value={height}
                required
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Masons
              </label>
              <input
                type="number"
                value={masons}
                required
                onChange={(e) => setMasons(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter number of masons"
              />
            </div>
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200"
            >
              Calculate
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Results
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex justify-between">
                <span className="font-medium">Total Square Feet:</span>
                <span className="font-bold text-blue-600">{result.totalSquareFeet}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Days Required:</span>
                <span className="font-bold text-blue-600">{result.daysRequired}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Completion Date:</span>
                <span className="font-bold text-blue-600">{result.completionDate}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {tasks.length > 0 && (
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Gantt Chart
          </h2>
          <GanttChart tasks={tasks} />
        </div>
      )}
    </div>
  );
};

export default Scheduler;