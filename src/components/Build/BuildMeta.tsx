import React from 'react';
import type { BuildData } from '../../engine/buildSchema';
import styles from './BuildMeta.module.css';
import { Ruler, Tag, Fingerprint, Sparkles } from 'lucide-react';

interface Props {
  build: BuildData;
}

const CATEGORY_LABELS: Record<string, string> = {
  house:        'House',
  factory:      'Factory',
  village:      'Village',
  castle:       'Castle',
  temple:       'Temple',
  treehouse:    'Tree House',
  bridge:       'Bridge',
  trainstation: 'Train Station',
};

export default function BuildMeta({ build }: Props) {
  const { dimensions, category, seed, inspiration, description } = build;

  return (
    <div className={styles.grid}>
      <MetaItem icon={<Ruler size={16} />} label="Dimensions">
        {dimensions.width}W &times; {dimensions.height}H &times; {dimensions.depth}D blocks
      </MetaItem>
      <MetaItem icon={<Tag size={16} />} label="Category">
        {CATEGORY_LABELS[category] ?? category}
      </MetaItem>
      <MetaItem icon={<Fingerprint size={16} />} label="Seed">
        {seed}
      </MetaItem>
      {inspiration && (
        <MetaItem icon={<Sparkles size={16} />} label="Inspiration">
          {inspiration}
        </MetaItem>
      )}
      {description && (
        <MetaItem icon={<Sparkles size={16} />} label="Description" wide>
          {description}
        </MetaItem>
      )}
    </div>
  );
}

function MetaItem({
  icon,
  label,
  children,
  wide,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`${styles.item} ${wide ? styles.wide : ''}`}>
      <span className={styles.itemIcon}>{icon}</span>
      <div>
        <span className={styles.itemLabel}>{label}</span>
        <span className={styles.itemValue}>{children}</span>
      </div>
    </div>
  );
}
