import React from "react";
import BatteryConfiguration from "./components/BatteryConfiguration";
import BatteriesList from "./components/BatteryList";
import "../src/styles/main.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-6 center">
            Battery Configuration
          </h1>
          <BatteriesList />
        </div>
        <div>
          <BatteryConfiguration />
        </div>
      </div>
    </div>
  );
};

export default App;
