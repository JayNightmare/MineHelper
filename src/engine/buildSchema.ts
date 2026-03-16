/** Build data types used across the entire application. */

export interface Block {
  x: number;
  y: number;
  z: number;
  type: string;
}

export interface MaterialCount {
  type: string;
  count: number;
  color: string;
}

export interface BuildData {
  blocks: Block[];
  dimensions: { width: number; height: number; depth: number };
  category: string;
  description: string;
  seed: number;
  inspiration?: string;
  materials: MaterialCount[];
}

export type BuildCategory =
  | 'house'
  | 'factory'
  | 'village'
  | 'castle'
  | 'temple'
  | 'treehouse'
  | 'bridge'
  | 'trainstation';

export interface GenerateBuildRequest {
  description: string;
  category: BuildCategory;
  blocks: string[];
  width: number;
  height: number;
}
