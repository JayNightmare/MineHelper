import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BuildCategory } from '../engine/buildSchema';
import DescriptionBox from '../components/Home/DescriptionBox';
import SizeInputs from '../components/Home/SizeInputs';
import BlockSelector from '../components/Home/BlockSelector';
import CategorySelector from '../components/Home/CategorySelector';
import styles from './HomePage.module.css';
import { Wand2 } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(12);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [category, setCategory] = useState<BuildCategory | null>(null);

  const isValid = description.trim().length > 0 && selectedBlocks.length > 0 && category !== null;

  const handleGenerate = useCallback(() => {
    if (!isValid || !category) return;
    const params = new URLSearchParams({
      description: description.trim(),
      category,
      blocks: selectedBlocks.join(','),
      width: String(width),
      height: String(height),
    });
    navigate(`/build?${params.toString()}`);
  }, [isValid, description, category, selectedBlocks, width, height, navigate]);

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Build anything in Minecraft
          </h1>
          <p className={styles.heroSub}>
            Describe your vision, pick your blocks, and generate a full 3D blueprint with a materials list in seconds.
          </p>
        </section>

        {/* Form wrapper */}
        <div className={styles.form}>
          {/* Description */}
          <section className={`card ${styles.section}`}>
            <h2 className="section-heading">1. Describe your build</h2>
            <DescriptionBox value={description} onChange={setDescription} />
          </section>

          {/* Size + blocks in a two-column layout on wider screens */}
          <div className={styles.splitRow}>
            <section className={`card ${styles.section}`}>
              <h2 className="section-heading">2. Set dimensions</h2>
              <SizeInputs
                width={width}
                height={height}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
              />
            </section>
          </div>

          {/* Blocks */}
          <section className={`card ${styles.section}`}>
            <h2 className="section-heading">3. Choose your blocks</h2>
            <BlockSelector selected={selectedBlocks} onChange={setSelectedBlocks} />
          </section>

          {/* Category */}
          <section className={`card ${styles.section}`}>
            <h2 className="section-heading">4. Building type</h2>
            <CategorySelector selected={category} onChange={setCategory} />
          </section>

          {/* Generate */}
          <div className={styles.generateRow}>
            {!isValid && (
              <p className={styles.hint}>
                {!description.trim() && 'Add a description · '}
                {selectedBlocks.length === 0 && 'Select at least one block · '}
                {!category && 'Choose a building type'}
              </p>
            )}
            <button
              type="button"
              className={`btn btn-primary ${styles.generateBtn}`}
              disabled={!isValid}
              onClick={handleGenerate}
            >
              <Wand2 size={18} />
              Generate Build
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
