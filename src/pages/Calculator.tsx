import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const Calculator = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleOperationClick = (op: string) => {
    if (op === "=") {
      if (operation && previousValue !== null) {
        performOperation("=");
        setOperation(null);
        setPreviousValue(null);
        setWaitingForOperand(true);
      }
    } else {
      performOperation(op);
    }
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "", ".", "="]
  ];

  const getButtonClass = (btn: string) => {
    if (btn === "") return "invisible";
    if (["÷", "×", "-", "+", "="].includes(btn)) {
      return `bg-calculator hover:bg-calculator/90 text-white ${btn === "=" ? "col-span-1" : ""}`;
    }
    if (["C", "±", "%"].includes(btn)) {
      return "bg-secondary hover:bg-secondary-hover text-secondary-foreground";
    }
    if (btn === "0") {
      return "bg-card hover:bg-card-hover text-card-foreground col-span-2";
    }
    return "bg-card hover:bg-card-hover text-card-foreground";
  };

  const handleButtonClick = (btn: string) => {
    if (btn >= "0" && btn <= "9") {
      inputNumber(btn);
    } else if (btn === ".") {
      inputDecimal();
    } else if (btn === "C") {
      clear();
    } else if (btn === "±") {
      setDisplay((parseFloat(display) * -1).toString());
    } else if (btn === "%") {
      setDisplay((parseFloat(display) / 100).toString());
    } else if (["÷", "×", "-", "+", "="].includes(btn)) {
      handleOperationClick(btn);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Calculator - QuikTools</title>
        <meta name="description" content="Free online calculator for basic arithmetic calculations. Simple, fast, and reliable for everyday math." />
      </Helmet>
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
          <h1 className="text-3xl font-bold">Calculator</h1>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="tool-card">
            {/* Display */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-card-foreground truncate">
                  {display}
                </div>
              </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
              {buttons.flat().map((btn, index) => (
                <Button
                  key={index}
                  onClick={() => handleButtonClick(btn)}
                  className={`h-14 text-lg font-semibold rounded-lg transition-all duration-150 ${getButtonClass(btn)}`}
                  disabled={btn === ""}
                >
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;