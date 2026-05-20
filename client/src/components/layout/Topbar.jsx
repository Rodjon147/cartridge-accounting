import styles from "./Topbar.module.css"

function Topbar({ title, onAdd }) {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.topbarTitle}>{title}</h1>

      <div className={styles.topbarActions}>
        {onAdd && (
          <button className={styles.addBtn} onClick={onAdd}>
            Добавить
          </button>
        )}
      </div>
    </header>
  )
}

export default Topbar
