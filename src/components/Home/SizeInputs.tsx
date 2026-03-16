import styles from './SizeInputs.module.css';

interface Props {
  width: number;
  height: number;
  onWidthChange: (v: number) => void;
  onHeightChange: (v: number) => void;
}

export default function SizeInputs({ width, height, onWidthChange, onHeightChange }: Props) {
  const clamp = (v: number) => Math.min(200, Math.max(1, v));

  return (
    <div className={styles.row}>
      <div className={styles.field}>
        <label htmlFor="build-width" className="label">Width (X blocks)</label>
        <input
          id="build-width"
          type="number"
          min={1}
          max={200}
          value={width}
          onChange={(e) => onWidthChange(clamp(parseInt(e.target.value, 10) || 1))}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="build-height" className="label">Height (Y blocks)</label>
        <input
          id="build-height"
          type="number"
          min={1}
          max={200}
          value={height}
          onChange={(e) => onHeightChange(clamp(parseInt(e.target.value, 10) || 1))}
        />
      </div>
    </div>
  );
}
