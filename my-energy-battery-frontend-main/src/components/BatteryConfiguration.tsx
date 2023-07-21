import React, { useState, useEffect } from "react";
import axios from "axios";
import { Battery, BatteryConfig } from "../types/types";
import BatteryLayout from "./BatteryLayout";

const baseURL = "http://localhost:4000";

const BatteryConfiguration: React.FC = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [config, setConfig] = useState<BatteryConfig>({
    megapack2XL: 0,
    megapack2: 0,
    megapack: 0,
    powerpack: 0,
  });

  const fetchBatteries = async () => {
    try {
      const response = await axios.get("/api/batteries");
      setBatteries(response.data);
    } catch (error) {
      console.log("Error fetching batteries:", error);
    }
  };

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchBatteries();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConfig((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/calculate`, config);
      setResult(response.data);
    } catch (error) {
      console.error("Error calculating battery configuration:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Battery Configuration
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Megapack 2XL:</label>
          <input
            type="number"
            name="megapack2XL"
            value={config.megapack2XL}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Megapack 2:</label>
          <input
            type="number"
            name="megapack2"
            value={config.megapack2}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Megapack :</label>
          <input
            type="number"
            name="megapack"
            value={config.megapack}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Powerpack :</label>
          <input
            type="number"
            name="powerpack"
            value={config.powerpack}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {batteries.map((battery) => (
            <div key={battery.name}>
              <label htmlFor={battery.name} className="font-semibold">
                {battery.name}
              </label>
              <input
                type="number"
                id={battery.name}
                name={battery.name.replace(/\s+/g, "").toLowerCase()}
                value={config[battery.name.replace(/\s+/g, "").toLowerCase()]}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600"
          >
            Calculate
          </button>
        </div>
      </form>
      <BatteryLayout config={config} />
      <div className="box">
        {result && (
          <div className="result-container">
            <h3 className="text-lg font-semibold">Calculated Result:</h3>
            <div className="battery-transformer-container">
              <div className="calculation-result">
                <p>Total Site: {result.areaDimensions}</p>
                <p>Total Transformers: {result.totalTransformer}</p>
                <p>Batteries Cost: ${result.batteriesCost}</p>
                <p>Total Cost: ${result.totalCost}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatteryConfiguration;
