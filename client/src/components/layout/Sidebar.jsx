import { Link, useLocation } from "react-router-dom"
import styles from "./Sidebar.module.css"

function Sidebar(){
    const location = useLocation()

    return (
      <dir className={styles.sidebar}>
        <h2 className={styles.logo}>Учёт картриджей</h2>

        <nav>
          <Link to="/" className={location.pathname == "/" ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Дашборд
          </Link>
          <Link
            to="/cartridges"
            className={location.pathname == "/cartridges" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Картриджи
          </Link>
          <Link
            to="/printers"
            className={location.pathname == "/printers" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Принтеры
          </Link>
          <Link
            to="/movement"
            className={location.pathname == "/movement" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Движение
          </Link>
        </nav>
      </dir>
    )
}

export default Sidebar