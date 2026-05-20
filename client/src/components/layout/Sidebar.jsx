import { Link, useLocation } from "react-router-dom"
import { FaChartPie, FaBox } from "react-icons/fa"
import { HiPrinter } from "react-icons/hi2"
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import styles from "./Sidebar.module.css"


function Sidebar(){
    const location = useLocation()

    return (
      <dir className={styles.sidebar}>
        <div className={styles.logo}>
          <HiPrinter className={styles.iconLogo} />
          <h2>Учёт картриджей</h2>
          <p>Система управления</p>
        </div>

        <nav>
          <Link to="/" className={location.pathname == "/" ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <FaChartPie />
            Дашборд
          </Link>
          <Link
            to="/cartridges"
            className={location.pathname == "/cartridges" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            <FaBox />
            Картриджи
          </Link>
          <Link
            to="/printers"
            className={location.pathname == "/printers" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            <HiPrinter />
            Принтеры
          </Link>
          <Link
            to="/movement"
            className={location.pathname == "/movement" ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            <FaArrowRightArrowLeft />
            Движение
          </Link>
        </nav>
      </dir>
    )
}

export default Sidebar