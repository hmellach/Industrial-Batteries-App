import React from "react";
import { BatteryConfig } from "../types/types";
import "../styles/battery.css";
import "../styles/transformer.css";

interface Props {
  config: BatteryConfig;
}

const BatteryLayout: React.FC<Props> = ({ config }) => {
  const getTotalBatteries = () => {
    return (
      config.megapack2XL + config.megapack2 + config.megapack + config.powerpack
    );
  };

  const getTotalTransformers = () => {
    return Math.floor(getTotalBatteries() / 4);
  };

  const generateBatteryDiv = (batteryName: string, index: number) => {
    const colorMap: any = {
      megapack2XL: "red",
      megapack2: "#7c7ca7",
      megapack: "green",
      powerpack: "yellow",
    };
    const sizeMap: any = {
      megapack2XL: { width: "150px", height: "80px" },
      megapack2: { width: "120px", height: "60px" },
      megapack: { width: "100px", height: "50px" },
      powerpack: { width: "100px", height: "40px" },
    };

    return (
      <div
        key={index}
        className="battery"
        style={{
          backgroundColor: colorMap[batteryName],
          width: sizeMap[batteryName].width,
          height: sizeMap[batteryName].height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {batteryName.toUpperCase()}
      </div>
    );
  };

  const generateBatterySymbol = (batteryName: string) => {
    const colorMap: any = {
      megapack2XL: "red",
      megapack2: "#7c7ca7",
      megapack: "green",
      powerpack: "yellow",
    };
    const sizeMap: any = {
      megapack2XL: "50px",
      megapack2: "40px",
      megapack: "25px",
      powerpack: "15px",
    };

    return (
      <div
        className="battery-symbol"
        style={{
          backgroundColor: colorMap[batteryName],
          width: sizeMap[batteryName],
          height: sizeMap[batteryName],
        }}
      ></div>
    );
  };

  const generateBatteryTable = () => {
    return (
      <table className="battery-table">
        <thead>
          <tr>
            <th>Battery Type</th>
            <th>Symbol</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(config).map(([batteryName, count]) => (
            <tr key={batteryName}>
              <td>{batteryName}</td>
              <td>{generateBatterySymbol(batteryName)}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const generateTransformerTable = () => {
    const transformerCount = getTotalTransformers();

    return (
      <table className="transformer-table">
        <thead>
          <tr>
            <th>Transformer</th>
            <th>Symbol</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transformer</td>
            <td>{generateTransformerSymbol()}</td>
            <td>{transformerCount}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const generateTransformerSymbol = () => {
    return (
      <div className="transformer">
        <div
          className="transformer-head"
          style={{
            backgroundColor: "black",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
        ></div>
        <div
          className="transformer-body"
          style={{
            backgroundColor: "gray",
            width: "16px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          T
        </div>
        <div
          className="transformer-legs"
          style={{
            backgroundColor: "gray",
            width: "4px",
            height: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
    );
  };

  const generateBatteriesLayout = () => {
    const batteryNames = ["megapack2XL", "megapack2", "megapack", "powerpack"];

    let batteryLayout: JSX.Element[] = [];

    batteryNames.forEach((batteryName) => {
      for (let i = 0; i < config[batteryName]; i++) {
        batteryLayout.push(generateBatteryDiv(batteryName, i));
      }
    });

    return batteryLayout;
  };

  return (
    <div className="battery-box">
      {/* <h2>Total Batteries: {getTotalBatteries()}</h2> */}
      {/* <h2>Total Transformers: {getTotalTransformers()}</h2> */}
      <div
        style={{
          border: "2px solid #ccc",
          display: "flex",
          flexWrap: "wrap",
          padding: "40px",
        }}
      >
        {generateBatteriesLayout()}
        {Array.from({ length: getTotalTransformers() }, (_, i) => (
          <div key={i}>{generateTransformerSymbol()}</div>
        ))}
      </div>
      <div className="battery-transformer-container">
        {generateBatteryTable()}
        {generateTransformerTable()}
      </div>
    </div>
  );
};

export default BatteryLayout;
