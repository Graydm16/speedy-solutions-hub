import { useNavigate, Link } from "react-router-dom";
import { Timer, Clock3, Calculator, Clock, ArrowRightLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";

const tools = [
  {
    name: "Timer",
    description: "Countdown timer with custom intervals",
    icon: Timer,
    path: "/timer",
    color: "timer",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Stopwatch", 
    description: "Precise time measurement and laps",
    icon: Clock3,
    path: "/stopwatch", 
    color: "stopwatch",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Calculator",
    description: "Basic arithmetic calculations",
    icon: Calculator,
    path: "/calculator",
    color: "calculator", 
    gradient: "from-violet-500 to-purple-500"
  },
  {
    name: "World Clock",
    description: "Time zones around the world",
    icon: Clock,
    path: "/clock",
    color: "clock",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    name: "Unit Converter",
    description: "Convert between different units",
    icon: ArrowRightLeft,
    path: "/converter",
    color: "converter",
    gradient: "from-pink-500 to-rose-500"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>QuikTools - Essential Utilities & Calculators Online</title>
        <meta name="description" content="Free online tools including timer, stopwatch, calculator, world clock, and unit converter. Simple, fast, and reliable utilities for everyday tasks." />
      </Helmet>
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            QuikTools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Essential utilities at your fingertips. Simple, fast, and reliable tools for everyday tasks.
          </p>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.name}
                onClick={() => navigate(tool.path)}
                className="tool-card group"
                data-tool={tool.color}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient} text-white group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">{tool.name}</h3>
                  </div>
                </div>
                <p className="tool-description leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center text-primary group-hover:text-primary/80 transition-colors">
                  <span className="text-sm font-medium">Open Tool</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/50">
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-muted-foreground">&copy; 2025 QuikTools. Simple utilities for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;