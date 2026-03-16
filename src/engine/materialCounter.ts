/**
 * Counts and aggregates block types from a Block array.
 * Returns entries sorted descending by count.
 */
import type { Block, MaterialCount } from './buildSchema';

/** Maps block type names to their display colors. */
const BLOCK_COLORS: Record<string, string> = {
  'Stone':            '#8a8a8a',
  'Oak Log':          '#7a5c2e',
  'Oak Planks':       '#c89a56',
  'Cobblestone':      '#6f6f6f',
  'Bricks':           '#8e4b3b',
  'Glass':            '#a8d8ea',
  'Sand':             '#d4c08a',
  'Gravel':           '#8a8078',
  'Iron Block':       '#cacaca',
  'Gold Block':       '#f5c542',
  'Diamond Block':    '#4dd9c5',
  'Dirt':             '#7a5230',
  'Wool':             '#e8e8e8',
  'Glass Pane':       '#b0d8e8',
  'Obsidian':         '#2a1a3a',
  'Nether Brick':     '#3a1a1a',
  'Quartz Block':     '#f0ece0',
  'Mossy Cobblestone':'#5a7a5a',
  'Smooth Stone':     '#a0a0a0',
  'Sandstone':        '#c8b870',
  'Spruce Planks':    '#7a5528',
  'Birch Planks':     '#e0cf9a',
  'Acacia Planks':    '#b85c28',
  'Dark Oak Planks':  '#3a2210',
};

export const getBlockColor = (type: string): string =>
  BLOCK_COLORS[type] ?? '#888888';

export function countMaterials(blocks: Block[]): MaterialCount[] {
  const counts = new Map<string, number>();
  for (const block of blocks) {
    counts.set(block.type, (counts.get(block.type) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count, color: getBlockColor(type) }));
}
