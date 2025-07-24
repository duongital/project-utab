import { useState, useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
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
            <Slot
              onClick={handleStart}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600 h-10 px-4 py-2"
            >
              <button>Start</button>
            </Slot>
          ) : (
            <Slot
              onClick={handleStop}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-10 px-4 py-2"
            >
              <button>Stop</button>
            </Slot>
          )}
          <Slot
            onClick={handleReset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-500 text-white hover:bg-gray-600 h-10 px-4 py-2"
          >
            <button>Reset</button>
          </Slot>
        </div>

        {!isRunning && seconds === 0 && (
          <p className="text-sm text-gray-500 mt-2">Click Start to begin timer</p>
        )}
      </div>
    </article>
  );
}