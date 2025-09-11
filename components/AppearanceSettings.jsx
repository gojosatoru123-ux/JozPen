'use client';

import { useState } from 'react';

export default function AppearanceSettings() {
  const [text, setText] = useState('Large');
  const [width, setWidth] = useState('Wide');
  const [color, setColor] = useState('Light');
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const handleTogglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <div className="hidden md:block bg-gray-50 border border-gray-200 rounded-md sticky top-30 w-64 mb-15">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-md">
        <h3 className="text-sm font-medium text-gray-900">Appearance</h3>
        <button
          onClick={handleTogglePanel}
          className="text-xs text-gray-500 hover:text-gray-700 uppercase tracking-wide"
        >
          {isPanelVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Content */}
      {isPanelVisible && (
        <div className="px-4 py-3 space-y-4">
          {/* Text Size Section */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
              Text Size
            </h4>
            <div className="space-y-1">
              {['Small', 'Standard', 'Large'].map((option) => (
                <label key={option} className="flex items-center py-1 cursor-pointer group">
                  <input
                    type="radio"
                    name="text"
                    value={option}
                    checked={text === option}
                    onChange={(e) => setText(e.target.value)}
                    className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Width Section */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
              Width
            </h4>
            <div className="space-y-1">
              {['Standard', 'Wide'].map((option) => (
                <label key={option} className="flex items-center py-1 cursor-pointer group">
                  <input
                    type="radio"
                    name="width"
                    value={option}
                    checked={width === option}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
              Theme
              <span className="ml-1 text-xs text-gray-400 normal-case">(beta)</span>
            </h4>
            <div className="space-y-1">
              {['Automatic', 'Light', 'Dark'].map((option) => (
                <label key={option} className="flex items-center py-1 cursor-pointer group">
                  <input
                    type="radio"
                    name="color"
                    value={option}
                    checked={color === option}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}