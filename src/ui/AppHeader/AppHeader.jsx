import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Simon Says</h1>
    </header>
  );
}

export default AppHeader;
