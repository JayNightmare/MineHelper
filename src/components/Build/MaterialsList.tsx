import type { BuildData } from '../../engine/buildSchema';
import styles from './MaterialsList.module.css';

interface Props {
  build: BuildData;
}

export default function MaterialsList({ build }: Props) {
  const total = build.materials.reduce((s, m) => s + m.count, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className="section-heading" style={{ marginBottom: 0 }}>Materials</span>
        <span className="badge">{total.toLocaleString()} blocks</span>
      </div>
      <ul className={styles.list}>
        {build.materials.map((m) => (
          <li key={m.type} className={styles.item}>
            <span className={styles.swatch} style={{ background: m.color }} />
            <span className={styles.name}>{m.type}</span>
            <span className={styles.count}>{m.count.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
