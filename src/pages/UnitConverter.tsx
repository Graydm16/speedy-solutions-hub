import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversionCategory {
  name: string;
  units: { [key: string]: { name: string; factor: number } };
}

const categories: { [key: string]: ConversionCategory } = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeters", factor: 1 },
      cm: { name: "Centimeters", factor: 10 },
      m: { name: "Meters", factor: 1000 },
      km: { name: "Kilometers", factor: 1000000 },
      in: { name: "Inches", factor: 25.4 },
      ft: { name: "Feet", factor: 304.8 },
      yd: { name: "Yards", factor: 914.4 },
      mi: { name: "Miles", factor: 1609344 },
    }
  },
  weight: {
    name: "Weight",
    units: {
      mg: { name: "Milligrams", factor: 1 },
      g: { name: "Grams", factor: 1000 },
      kg: { name: "Kilograms", factor: 1000000 },
      oz: { name: "Ounces", factor: 28349.5 },
      lb: { name: "Pounds", factor: 453592 },
      st: { name: "Stones", factor: 6350290 },
    }
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", factor: 1 },
      f: { name: "Fahrenheit", factor: 1 },
      k: { name: "Kelvin", factor: 1 },
    }
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliters", factor: 1 },
      l: { name: "Liters", factor: 1000 },
      floz: { name: "Fluid Ounces", factor: 29.5735 },
      cup: { name: "Cups", factor: 236.588 },
      pt: { name: "Pints", factor: 473.176 },
      qt: { name: "Quarts", factor: 946.353 },
      gal: { name: "Gallons", factor: 3785.41 },
    }
  }
};

const UnitConverter = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius = value;
    if (from === "f") {
      celsius = (value - 32) * 5/9;
    } else if (from === "k") {
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === "f") {
      return celsius * 9/5 + 32;
    } else if (to === "k") {
      return celsius + 273.15;
    }
    return celsius;
  };

  const convertValue = (value: string, from: string, to: string): string => {
    if (!value || isNaN(parseFloat(value))) return "";
    
    const numValue = parseFloat(value);
    
    if (category === "temperature") {
      const result = convertTemperature(numValue, from, to);
      return result.toFixed(6).replace(/\.?0+$/, "");
    } else {
      const categoryData = categories[category];
      const fromFactor = categoryData.units[from].factor;
      const toFactor = categoryData.units[to].factor;
      const result = (numValue * fromFactor) / toFactor;
      return result.toFixed(6).replace(/\.?0+$/, "");
    }
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    const converted = convertValue(value, fromUnit, toUnit);
    setToValue(converted);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    const converted = convertValue(value, toUnit, fromUnit);
    setFromValue(converted);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(categories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue("");
    setToValue("");
  };

  const currentUnits = categories[category].units;

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
          <h1 className="text-3xl font-bold">Unit Converter</h1>
        </div>

        <div className="max-w-md mx-auto">
          <div className="tool-card">
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Category
              </label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* From Unit */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                From
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  className="flex-1"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={swapUnits}
                className="bg-converter/10 hover:bg-converter/20 border-converter/20"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                To
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Result"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  className="flex-1"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result Display */}
            {fromValue && toValue && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Conversion Result
                </div>
                <div className="font-mono text-lg">
                  <span className="font-semibold">{fromValue}</span>{" "}
                  <span className="text-muted-foreground">
                    {currentUnits[fromUnit].name}
                  </span>{" "}
                  = <span className="font-semibold text-converter">{toValue}</span>{" "}
                  <span className="text-muted-foreground">
                    {currentUnits[toUnit].name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;