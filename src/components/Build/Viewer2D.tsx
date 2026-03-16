import { useMemo, useState } from 'react';
import type { BuildData } from '../../engine/buildSchema';
import { getBlockColor } from '../../engine/materialCounter';
import styles from './Viewer2D.module.css';

interface Props {
  build: BuildData;
}

const CELL = 12;

export default function Viewer2D({ build }: Props) {
  const [layer, setLayer] = useState(0);
  const maxLayer = build.dimensions.height - 1;

  const slice = useMemo(
    () => build.blocks.filter((b) => b.y === layer),
    [build.blocks, layer]
  );

  const svgW = build.dimensions.width * CELL;
  const svgH = build.dimensions.depth * CELL;

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <label htmlFor="layer-slider" className="label" style={{ marginBottom: 0 }}>
          Layer Y = {layer}
        </label>
        <input
          id="layer-slider"
          type="range"
          min={0}
          max={maxLayer}
          value={layer}
          onChange={(e) => setLayer(Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      <div className={styles.canvasWrapper}>
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className={styles.svg}
        >
          {/* Grid background */}
          {Array.from({ length: build.dimensions.width }, (_, x) =>
            Array.from({ length: build.dimensions.depth }, (_, z) => (
              <rect
                key={`${x}-${z}`}
                x={x * CELL}
                y={z * CELL}
                width={CELL}
                height={CELL}
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth={0.5}
              />
            ))
          )}
          {/* Blocks */}
          {slice.map((b, i) => (
            <rect
              key={i}
              x={b.x * CELL}
              y={b.z * CELL}
              width={CELL}
              height={CELL}
              fill={getBlockColor(b.type)}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth={0.5}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
