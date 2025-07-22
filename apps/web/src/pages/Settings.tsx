import { useState, useEffect } from 'react'

export default function Settings() {
  const [focusMode, setFocusMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('focusMode')
    if (saved) {
      setFocusMode(JSON.parse(saved))
    }
  }, [])

  const handleFocusModeChange = (enabled: boolean) => {
    setFocusMode(enabled)
    localStorage.setItem('focusMode', JSON.stringify(enabled))
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Focus Mode</h3>
            <p className="text-sm text-gray-500">Hide UI elements for distraction-free drawing</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={focusMode}
              onChange={(e) => handleFocusModeChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}