import {
  Home,
  Factory,
  Building2,
  Castle,
  Church,
  TreePine,
  ArrowLeftRight,
  TramFront,
} from 'lucide-react';
import type { BuildCategory } from '../../engine/buildSchema';
import styles from './CategorySelector.module.css';
import React, { useCallback } from 'react';

const CATEGORIES: { id: BuildCategory; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'house',       label: 'House',         icon: <Home size={28} />,           description: 'Cozy residential home' },
  { id: 'factory',     label: 'Factory',       icon: <Factory size={28} />,         description: 'Industrial production facility' },
  { id: 'village',     label: 'Village',       icon: <Building2 size={28} />,       description: 'Cluster of small buildings' },
  { id: 'castle',      label: 'Castle',        icon: <Castle size={28} />,          description: 'Fortified stone stronghold' },
  { id: 'temple',      label: 'Temple',        icon: <Church size={28} />,          description: 'Ancient place of worship' },
  { id: 'treehouse',   label: 'Tree House',    icon: <TreePine size={28} />,        description: 'Elevated woodland cabin' },
  { id: 'bridge',      label: 'Bridge',        icon: <ArrowLeftRight size={28} />,  description: 'Spanning arch structure' },
  { id: 'trainstation',label: 'Train Station', icon: <TramFront size={28} />,       description: 'Victorian era rail terminal' },
];

interface Props {
  selected: BuildCategory | null;
  onChange: (c: BuildCategory) => void;
}

export default function CategorySelector({ selected, onChange }: Props) {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', String(x));
    el.style.setProperty('--mouse-y', String(y));
  }, []);

  return (
    <div>
      <p className="label">Building type</p>
      <div className={styles.grid}>
        {CATEGORIES.map(({ id, label, icon, description }) => (
          <button
            key={id}
            type="button"
            aria-pressed={selected === id}
            className={`card ${styles.card} ${selected === id ? styles.active : ''}`}
            onClick={() => onChange(id)}
            onMouseMove={onMouseMove}
          >
            <span className={`${styles.icon} ${selected === id ? styles.iconActive : ''}`}>
              {icon}
            </span>
            <span className={styles.label}>{label}</span>
            <span className={styles.desc}>{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
