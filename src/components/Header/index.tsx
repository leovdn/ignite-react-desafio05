import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header>
      <div className={styles.container}>
        <img src="/logo.svg" alt="Space Traveling logo" />
      </div>
    </header>
  );
}
