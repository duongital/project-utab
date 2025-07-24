import { useState, useEffect, useRef } from "react";
import { ICardShape } from "../card-shape-props";

interface CardTypeTimerProps {
  isEditing: boolean;
  shape: ICardShape;
  self: any;
}

export default function CardTypeTimer({}: CardTypeTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current!);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <article>
      <div className="flex flex-col items-center p-4">
        <div className="text-4xl font-mono font-bold mb-4">
          {formatTime(seconds)}
        </div>
        
        <div
          style={{
            pointerEvents: "all",
          }}
          className="flex gap-2"
        >
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Stop
            </button>
          )}
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {!isRunning && seconds === 0 && (
          <p className="text-sm text-gray-500 mt-2">Click Start to begin timer</p>
        )}
      </div>
    </article>
  );
}