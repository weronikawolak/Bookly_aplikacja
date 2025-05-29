// components/ReadingGoal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadingGoal = () => {
  const [goal, setGoal] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inputGoal, setInputGoal] = useState('');

  const token = localStorage.getItem('token');

  const fetchProgress = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/reading-goal/progress/', {
        headers: { Authorization: `Token ${token}` },
      });
      setGoal(res.data.goal);
      setCompleted(res.data.completed);
      setProgress(res.data.progress);
    } catch (err) {
      console.warn('No goal found.');
    }
  };

  const submitGoal = async () => {
    const year = new Date().getFullYear();
    try {
      await axios.post('http://127.0.0.1:8000/api/reading-goal/', {
        year,
        goal: inputGoal,
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchProgress();
    } catch (err) {
      console.error('Error setting goal:', err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📚 Yearly Reading Goal</h2>
      {goal ? (
        <div>
          <p><strong>Goal:</strong> {goal} books</p>
          <p><strong>Completed:</strong> {completed} books</p>
          <p><strong>Progress:</strong> {progress}%</p>
          <div className="w-full bg-gray-200 rounded h-4 mt-2">
            <div
              className="bg-green-500 h-4 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="number"
            placeholder="Set your yearly goal"
            value={inputGoal}
            onChange={(e) => setInputGoal(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <button
            onClick={submitGoal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingGoal;


// Dodaj <ReadingGoal /> do StatisticsPage lub odpowiedniego widoku
