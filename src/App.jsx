import React, { useState } from "react";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './index.css';
import Upload from "./Upload"; // ✅ Correct import — path should be './Upload' (NOT './src/Upload')

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-2 py-4">
      {/* Container width and padding responsive adjustments */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-10 sm:h-12 md:h-14" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-10 sm:h-12 md:h-14" alt="React logo" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-4">
          🚀 Vite + React + Tailwind
        </h1>

        {/* Upload Component */}
        <Upload />

        <div className="mt-8 text-center">
  <button
    onClick={() => setCount((count) => count + 1)}
    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-6 py-2 rounded-2xl shadow-md transition duration-300 ease-in-out"
  >
    🚀 Count is {count}
  </button>

  <p className="mt-4 text-gray-700 text-sm sm:text-base">
    ✏️ Edit <code className="bg-gray-200 px-1 py-0.5 rounded">src/App.jsx</code> and save to test HMR
  </p>

  <p className="mt-2 text-xs sm:text-sm text-gray-500 italic">
    🔗 Click on the logos above to learn more
  </p>
</div>

      </div>
    </div>
  );
}


export default App;
