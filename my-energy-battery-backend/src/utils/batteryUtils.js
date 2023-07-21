"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRequiredEnergy = exports.calculateLandSize = exports.calculateBudget = void 0;
const maxLayoutWidth = 100;
const calculateBudget = (selectedBatteries) => {
    let budget = 0;
    for (const { battery, quantity } of selectedBatteries) {
        budget += quantity * battery.cost;
    }
    return budget;
};
exports.calculateBudget = calculateBudget;
const calculateLandSize = (selectedBatteries) => {
    let totalArea = 0;
    for (const { battery, quantity } of selectedBatteries) {
        const dimensions = battery.floorDimensions.split("*");
        const area = parseInt(dimensions[0], 10) * parseInt(dimensions[1], 10) * quantity;
        totalArea += area;
    }
    if (totalArea > maxLayoutWidth) {
        const width = maxLayoutWidth;
        const length = Math.ceil(totalArea / maxLayoutWidth);
        return `${width}FT * ${length}FT`;
    }
    else {
        return `${totalArea}FT * 10FT`;
    }
};
exports.calculateLandSize = calculateLandSize;
const calculateRequiredEnergy = (selectedBatteries) => {
    let totalEnergy = 0;
    for (const { battery, quantity } of selectedBatteries) {
        totalEnergy += battery.energy * quantity;
    }
    return totalEnergy;
};
exports.calculateRequiredEnergy = calculateRequiredEnergy;
