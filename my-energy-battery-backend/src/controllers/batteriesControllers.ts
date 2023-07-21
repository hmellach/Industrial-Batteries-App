import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { Battery } from "../types";
import {
  SelectedBatteries,
  calculateBudget,
  calculateLandSize,
  calculateRequiredEnergy,
} from "../utils/batteryUtils";
import { batteriesData } from "./batteries";

export const getBatteries = (req: Request, res: Response) => {
  try {
    const batteries: Battery[] = batteriesData;
    res.json(batteries);
  } catch (error) {
    console.log("Error reading batteries data:", error);
    res.status(500).json({ message: "Error in fetching batteries data" });
  }
};

export const calculateBatteryConfiguration = (req: Request, res: Response) => {
  try {
    const { megapack2XL, megapack2, megapack, powerpack } = req.body;

    const batteries: Battery[] = batteriesData;

    const selectedBatteries: SelectedBatteries[] = [
      { battery: batteries[0], quantity: megapack2XL },
      { battery: batteries[1], quantity: megapack2 },
      { battery: batteries[2], quantity: megapack },
      { battery: batteries[3], quantity: powerpack },
    ];

    const totalIndustrialBatteries =
      megapack2XL + megapack2 + megapack + powerpack;
    const transformerNeeded = Math.floor(totalIndustrialBatteries / 4);

    selectedBatteries.push({
      battery: batteries[4],
      quantity: transformerNeeded,
    });

    const batteriesCost = calculateBudget(selectedBatteries);
    const landSize = calculateLandSize(selectedBatteries);
    const requiredEnergy = calculateRequiredEnergy(selectedBatteries);

    const [width, length] = landSize.split(" * ");

    const areaDimensions = `${width} * ${length}`;

    //Calculate total transformers required
    const totalTransformer = transformerNeeded;
    const transformerCost = transformerNeeded * batteries[4].cost;

    const totalCost = batteriesCost + transformerCost;

    res.json({
      batteriesCost,
      landSize,
      areaDimensions,
      requiredEnergy,
      transformerNeeded,
      transformerCost,
      totalTransformer,
      totalCost,
    });
  } catch (error) {
    console.log("Error calculating battery configuration:", error);
    res
      .status(500)
      .json({ message: "Error while calculating battery configuration" });
  }
};
