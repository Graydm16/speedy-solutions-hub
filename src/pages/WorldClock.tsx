import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeZone {
  name: string;
  zone: string;
  city: string;
  country: string;
}

const timeZones: TimeZone[] = [
  { name: "Local Time", zone: Intl.DateTimeFormat().resolvedOptions().timeZone, city: "Your Location", country: "" },
  { name: "New York", zone: "America/New_York", city: "New York", country: "USA" },
  { name: "Los Angeles", zone: "America/Los_Angeles", city: "Los Angeles", country: "USA" },
  { name: "London", zone: "Europe/London", city: "London", country: "UK" },
  { name: "Paris", zone: "Europe/Paris", city: "Paris", country: "France" },
  { name: "Tokyo", zone: "Asia/Tokyo", city: "Tokyo", country: "Japan" },
  { name: "Sydney", zone: "Australia/Sydney", city: "Sydney", country: "Australia" },
  { name: "Dubai", zone: "Asia/Dubai", city: "Dubai", country: "UAE" },
  { name: "Singapore", zone: "Asia/Singapore", city: "Singapore", country: "Singapore" },
];

const WorldClock = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getTimeDifference = (timeZone: string) => {
    const localTime = new Date();
    const targetTime = new Date(localTime.toLocaleString("en-US", { timeZone }));
    const localTimeInMs = new Date(localTime.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
    
    const diffInHours = (targetTime.getTime() - localTimeInMs.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours === 0) return "Same time";
    const sign = diffInHours > 0 ? "+" : "";
    return `${sign}${diffInHours.toFixed(0)}h`;
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
          <h1 className="text-3xl font-bold">World Clock</h1>
        </div>

        {/* Time Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {timeZones.map((tz, index) => (
            <div key={tz.zone} className="tool-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-clock" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">{tz.city}</h3>
                    {tz.country && (
                      <p className="text-sm text-muted-foreground">{tz.country}</p>
                    )}
                  </div>
                </div>
                {index !== 0 && (
                  <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    {getTimeDifference(tz.zone)}
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-card-foreground mb-2">
                  {formatTime(currentTime, tz.zone)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(currentTime, tz.zone)}
                </div>
              </div>

              {index === 0 && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center px-2 py-1 rounded bg-clock/10 text-clock text-xs font-medium">
                    Your Local Time
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Times update automatically every second. Time differences are relative to your local time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;