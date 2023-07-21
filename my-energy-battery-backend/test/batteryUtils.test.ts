import { expect } from "chai";
import {
  calculateBudget,
  calculateLandSize,
  calculateRequiredEnergy,
  SelectedBatteries,
} from "../src/utils/batteryUtils";
import { Battery } from "../src/types";

describe("Battery Utils Test", () => {
  // Sample data for testing
  const batteries: Battery[] = [
    {
      name: "Megapack 2XL",
      floorDimensions: "40FT * 10FT",
      energy: 4,
      cost: 120000,
      releaseDate: "2022",
    },
    {
      name: "Megapack 2",
      floorDimensions: "30FT * 10FT",
      energy: 3,
      cost: 80000,
      releaseDate: "2021",
    },
    {
      name: "Megapack",
      floorDimensions: "30FT * 10FT",
      energy: 2,
      cost: 50000,
      releaseDate: "2005",
    },
    {
      name: "Powerpack",
      floorDimensions: "10FT * 10FT",
      energy: 1,
      cost: 20000,
      releaseDate: "2000",
    },
    {
      name: "Transformer",
      floorDimensions: "10FT * 10FT",
      energy: -0.25,
      cost: 10000,
      releaseDate: "-",
    },
  ];

  it("should calculate the correct budget", () => {
    const selectedBatteries: SelectedBatteries[] = [
      { battery: batteries[0], quantity: 2 },
      { battery: batteries[1], quantity: 3 },
      { battery: batteries[2], quantity: 1 },
      { battery: batteries[3], quantity: 5 },
    ];

    const expectedBudget = 2 * 120000 + 3 * 80000 + 1 * 50000 + 5 * 20000;
    const actualBudget = calculateBudget(selectedBatteries);
    expect(actualBudget).to.equal(expectedBudget);
  });

  it("should calculate the correct land size", () => {
    const selectedBatteries: SelectedBatteries[] = [
      { battery: batteries[0], quantity: 2 },
      { battery: batteries[1], quantity: 3 },
      { battery: batteries[2], quantity: 1 },
      { battery: batteries[3], quantity: 5 },
    ];

    const expectedLandSize = "100FT * 25FT";
    const actualLandSize = calculateLandSize(selectedBatteries);
    expect(actualLandSize).to.equal(expectedLandSize);
  });

  it("should calculate the correct required energy", () => {
    const selectedBatteries: SelectedBatteries[] = [
      { battery: batteries[0], quantity: 2 },
      { battery: batteries[1], quantity: 3 },
      { battery: batteries[2], quantity: 1 },
      { battery: batteries[3], quantity: 5 },
    ];

    const expectedRequiredEnergy = 2 * 4 + 3 * 3 + 1 * 2 + 5 * 1;
    const actualRequiredEnergy = calculateRequiredEnergy(selectedBatteries);
    expect(actualRequiredEnergy).to.equal(expectedRequiredEnergy);
  });
});
