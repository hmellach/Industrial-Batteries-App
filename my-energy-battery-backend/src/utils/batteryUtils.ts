import { Battery } from "../types";

export interface SelectedBatteries {
  battery: Battery;
  quantity: number;
}

const maxLayoutWidth = 100;

export const calculateBudget = (
  selectedBatteries: SelectedBatteries[]
): number => {
  let budget = 0;

  for (const { battery, quantity } of selectedBatteries) {
    budget += quantity * battery.cost;
  }

  return budget;
};

export const calculateLandSize = (
  selectedBatteries: SelectedBatteries[]
): string => {
  let totalArea = 0;

  for (const { battery, quantity } of selectedBatteries) {
    const dimensions = battery.floorDimensions.split("*");
    const area =
      parseInt(dimensions[0], 10) * parseInt(dimensions[1], 10) * quantity;
    totalArea += area;
  }

  const width = totalArea <= maxLayoutWidth ? totalArea : maxLayoutWidth;
  const length =
    totalArea <= maxLayoutWidth ? 10 : Math.ceil(totalArea / maxLayoutWidth);

  return `${width}FT * ${length}FT`;
};

export const calculateRequiredEnergy = (
  selectedBatteries: SelectedBatteries[]
): number => {
  let totalEnergy = 0;
  for (const { battery, quantity } of selectedBatteries) {
    totalEnergy += battery.energy * quantity;
  }
  return totalEnergy;
};
