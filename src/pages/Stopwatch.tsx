import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lap {
  id: number;
  time: number;
  lapTime: number;
}

const Stopwatch = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time * 10;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 10));
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const addLap = () => {
    if (isRunning && time > 0) {
      const lapTime = time - lastLapTimeRef.current;
      const newLap: Lap = {
        id: laps.length + 1,
        time: time,
        lapTime: lapTime
      };
      setLaps(prev => [newLap, ...prev]);
      lastLapTimeRef.current = time;
    }
  };

  const formatTime = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Stopwatch</h1>
        </div>

        <div className="max-w-md mx-auto">
          {/* Main Display */}
          <div className="tool-card text-center mb-6">
            <div className="mb-8">
              <div className="text-6xl font-mono font-bold text-card-foreground mb-2">
                {formatTime(time)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isRunning ? "Running" : time > 0 ? "Stopped" : "Ready"}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={startStop}
                className="bg-stopwatch hover:bg-stopwatch/90 text-white px-6 py-3"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              
              {isRunning && (
                <Button
                  variant="outline"
                  onClick={addLap}
                  className="px-6 py-3"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Lap
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={reset}
                className="px-6 py-3"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="tool-card">
              <h3 className="text-lg font-semibold mb-4">Laps</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {laps.map((lap) => (
                  <div
                    key={lap.id}
                    className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md"
                  >
                    <span className="font-medium">Lap {lap.id}</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">
                        {formatTime(lap.lapTime)}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {formatTime(lap.time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;