import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Timer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSetup, setIsSetup] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsSetup(true);
            toast({
              title: "Timer finished!",
              description: "Your countdown has reached zero.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, toast]);

  const startTimer = () => {
    if (isSetup) {
      const totalSeconds = minutes * 60 + seconds;
      if (totalSeconds === 0) return;
      setTimeLeft(totalSeconds);
      setIsSetup(false);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsSetup(true);
    setTimeLeft(0);
  };

  const adjustMinutes = (increment: boolean) => {
    if (!isSetup) return;
    setMinutes(prev => Math.max(0, Math.min(99, prev + (increment ? 1 : -1))));
  };

  const adjustSeconds = (increment: boolean) => {
    if (!isSetup) return;
    setSeconds(prev => Math.max(0, Math.min(59, prev + (increment ? 1 : -1))));
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const displayTime = isSetup ? formatTime(minutes * 60 + seconds) : formatTime(timeLeft);
  const progress = isSetup ? 0 : ((minutes * 60 + seconds - timeLeft) / (minutes * 60 + seconds)) * 100;

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
          <h1 className="text-3xl font-bold">Timer</h1>
        </div>

        {/* Timer Interface */}
        <div className="max-w-md mx-auto">
          <div className="tool-card text-center">
            {/* Progress Ring */}
            <div className="relative mb-8">
              <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(var(--timer))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 rotate-[-90deg] origin-center"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold text-card-foreground mb-2">
                    {displayTime}
                  </div>
                  {!isSetup && (
                    <div className="text-sm text-muted-foreground">
                      {isRunning ? "Running" : "Paused"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Time Adjustment (Setup Mode) */}
            {isSetup && (
              <div className="flex items-center justify-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Minutes</div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustMinutes(false)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="w-12 text-center font-mono font-bold">
                      {minutes.toString().padStart(2, '0')}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustMinutes(true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Seconds</div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustSeconds(false)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="w-12 text-center font-mono font-bold">
                      {seconds.toString().padStart(2, '0')}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustSeconds(true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={isRunning ? pauseTimer : startTimer}
                disabled={isSetup && minutes === 0 && seconds === 0}
                className="bg-timer hover:bg-timer/90 text-white px-6 py-3"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetTimer}
                className="px-6 py-3"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;