import { useCallback } from 'react';
import styles from './BlockSelector.module.css';
import { getBlockColor } from '../../engine/materialCounter';

const BLOCKS = [
  'Stone',
  'Oak Log',
  'Oak Planks',
  'Cobblestone',
  'Bricks',
  'Glass',
  'Sand',
  'Gravel',
  'Iron Block',
  'Gold Block',
  'Diamond Block',
  'Dirt',
  'Wool',
  'Glass Pane',
  'Obsidian',
  'Nether Brick',
  'Quartz Block',
  'Mossy Cobblestone',
  'Smooth Stone',
  'Sandstone',
  'Spruce Planks',
  'Birch Planks',
  'Acacia Planks',
  'Dark Oak Planks',
];

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function BlockSelector({ selected, onChange }: Props) {
  const toggle = useCallback(
    (block: string) => {
      if (selected.includes(block)) {
        onChange(selected.filter((b) => b !== block));
      } else {
        onChange([...selected, block]);
      }
    },
    [selected, onChange]
  );

  return (
    <div>
      <p className="label">
        Select blocks&nbsp;
        <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
          ({selected.length} selected)
        </span>
      </p>
      <div className={styles.grid}>
        {BLOCKS.map((block) => {
          const isActive = selected.includes(block);
          const color = getBlockColor(block);
          return (
            <button
              key={block}
              type="button"
              aria-pressed={isActive}
              className={`${styles.blockCard} card ${isActive ? styles.active : ''}`}
              onClick={() => toggle(block)}
            >
              <span
                className={styles.swatch}
                style={{ background: color }}
              />
              <span className={styles.name}>{block}</span>
              {isActive && (
                <span className={styles.check} aria-hidden="true">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { BLOCKS };
