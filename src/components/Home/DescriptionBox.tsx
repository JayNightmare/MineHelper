import { useRef } from 'react';
import styles from './DescriptionBox.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const MAX = 500;

export default function DescriptionBox({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="build-desc" className="label">
        Describe your build
      </label>
      <textarea
        ref={ref}
        id="build-desc"
        className={styles.textarea}
        rows={5}
        maxLength={MAX}
        placeholder="A medieval fortress with tall stone towers, mossy walls, and a working drawbridge over a lava moat…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={styles.count}>
        {value.length} / {MAX}
      </span>
    </div>
  );
}
