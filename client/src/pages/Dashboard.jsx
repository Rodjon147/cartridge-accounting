import { useEffect, useState } from "react"

import axios from "axios"
import styles from "./Dashboard.module.css"
import Topbar from "../components/layout/Topbar"

import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiSlash,
} from "react-icons/fi"

function Dashboard() {
  const [cartridges, setCartridges] = useState([])

  const [movements, setMovements] = useState([])

  

  const fetchDashboardData = async () => {
    try {
      const cartridgesRes = await axios.get("http://localhost:5000/api/cartridges")

      const movementsRes = await axios.get("http://localhost:5000/api/movements")

      setCartridges(cartridgesRes.data)

      setMovements(movementsRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadDashboard = async () => {
      await fetchDashboardData()
    }
    loadDashboard()
  }, [])
  
  const lowCartridges = cartridges.filter((item) => item.qty > 0 && item.qty <= item.min_qty)

  const emptyCartridges = cartridges.filter((item) => item.qty === 0)

  const normalCartridges = cartridges.filter((item) => item.qty > item.min_qty)

  const getMovementIcon = (type) => {
    switch (type) {
      case "Выдача":
        return <FiArrowUp />

      case "Поступление":
        return <FiArrowDown />

      case "Заправка":
        return <FiRefreshCw />

      case "Списание":
        return <FiSlash />

      default:
        return <FiRefreshCw />
    }
  }

  return (
    <>
      <Topbar title="Дашборд" />

      <div className={styles.content}>
        <div className={styles.dashboardStats}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.blue}`}>
              <FiPackage />
            </div>

            <h2>{cartridges.length}</h2>

            <p>Всего картриджей</p>
            <span className={styles.statSubtext}>
              {cartridges.reduce((sum, item) => sum + item.qty, 0)} шт. в наличии
            </span>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.green}`}>
              <FiCheckCircle />
            </div>

            <h2>{normalCartridges.length}</h2>

            <p>В норме</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.orange}`}>
              <FiAlertTriangle />
            </div>

            <h2>{lowCartridges.length}</h2>

            <p>Мало осталось</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.red}`}>
              <FiXCircle />
            </div>

            <h2>{emptyCartridges.length}</h2>

            <p>Закончились</p>
          </div>
        </div>

        <div className={styles.dashboardGrid}>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCardHeader}>
              <FiAlertTriangle />
              <h3>Требуют внимания</h3>
            </div>

            <div className={styles.dashboardList}>
              {[...lowCartridges, ...emptyCartridges].map((item) => (
                <div key={item.id} className={styles.dashboardItem}>
                  <div className={styles.movementInfo}>
                    <div
                      className={
                        item.qty === 0
                          ? `${styles.movementIcon} ${styles.red}`
                          : `${styles.movementIcon} ${styles.orange}`
                      }
                    >
                      {item.qty === 0 ? <FiXCircle /> : <FiAlertTriangle />}
                    </div>

                    <div>
                      <h4>{item.model}</h4>

                      <span>{item.printer}</span>
                    </div>
                  </div>

                  <div className={styles.dashboardItemRight}>
                    <strong className={item.qty === 0 ? styles.dangerText : styles.warningText}>{item.qty} шт.</strong>

                    <span>{item.qty === 0 ? "Закончились" : "Мало"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCardHeader}>
              <FiRefreshCw />
              <h3>Последние операции</h3>
            </div>

            <div className={styles.dashboardList}>
              {movements.slice(0, 5).map((item) => (
                <div key={item.id} className={styles.dashboardItem}>
                  <div className={styles.movementInfo}>
                    <div className={styles.movementIcon}>{getMovementIcon(item.action_type)}</div>

                    <div>
                      <h4>
                        {item.action_type}
                        {" — "}
                        {item.cartridge_model}
                      </h4>

                      <span>{item.comment || "Без комментария"}</span>
                    </div>
                  </div>

                  <strong>
                    {item.action_type === "Выдача" || item.action_type === "Списание" ? "-" : "+"}

                    {item.quantity}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
