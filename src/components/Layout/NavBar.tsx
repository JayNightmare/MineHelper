import styles from './NavBar.module.css';
import { Pickaxe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo}>
          <Pickaxe size={22} strokeWidth={2} />
          <span>MineHelper</span>
        </Link>
        <span className={styles.tagline}>Minecraft Build Generator</span>
      </nav>
    </header>
  );
}
