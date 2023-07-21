export interface Battery {
  name: string;
  floorDimensions: string;
  energy: number;
  cost: number;
  releaseDate: number;
  color: string;
  size: string;
}

export interface BatteryConfig {
  megapack2XL: number;
  megapack2: number;
  megapack: number;
  powerpack: number;
  [key: string]: number;
}

export interface BatteryLayout {
  name: string;
  dimensions: string;
  energy: string;
}
