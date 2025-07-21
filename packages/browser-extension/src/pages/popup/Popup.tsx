import { useEffect, useState } from "react";

export default function Popup() {
  const [isEnabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["isUsingFocusMode"], (result) => {
      setEnabled(result.isUsingFocusMode);
    });
  }, []);

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <p>Settings:</p>
      <label>
        <input
          className="mr-2"
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => {
            const newSetting = e.target.checked;

            chrome.storage.local.set({ isUsingFocusMode: newSetting }, () => {
              console.log("Value saved:", newSetting);
              setEnabled(newSetting);
            });
          }}
        />
        Focus Mode on Default
      </label>
    </div>
  );
}
