// src/components/BatteriesList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Battery {
  name: string;
  floorDimensions: string;
  energy: number;
  cost: number;
  releaseDate: number;
}

const baseURL = "http://localhost:4000";

const BatteriesList: React.FC = () => {
  const [batteries, setBatteries] = useState<Battery[]>([]);

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/batteries`);
        setBatteries(response.data);
      } catch (error) {
        console.error("Error fetching batteries data:", error);
      }
    };
    fetchBatteries();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Available Batteries
      </h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th>Floor Dimensions</th>
            <th>Name</th>
            <th>Energy</th>
            <th>Cost</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {batteries.map((battery) => (
            <tr key={battery.name}>
              <td>{battery.name}</td>
              <td>{battery.floorDimensions}</td>
              <td>{battery.energy} MWh</td>
              <td>${battery.cost}</td>
              <td>{battery.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatteriesList;
