import { useEffect, useState } from "react"

import axios from "axios"

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

      <div className="content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FiPackage />
            </div>

            <h2>{cartridges.length}</h2>

            <p>Всего картриджей</p>
            <span className="stat-subtext">{cartridges.reduce((sum, item) => sum + item.qty, 0)} шт. в наличии</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FiCheckCircle />
            </div>

            <h2>{normalCartridges.length}</h2>

            <p>В норме</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <FiAlertTriangle />
            </div>

            <h2>{lowCartridges.length}</h2>

            <p>Мало осталось</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <FiXCircle />
            </div>

            <h2>{emptyCartridges.length}</h2>

            <p>Закончились</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <FiAlertTriangle />

              <h3>Требуют внимания</h3>
            </div>

            <div className="dashboard-list">
              {[...lowCartridges, ...emptyCartridges].map((item) => (
                <div key={item.id} className="dashboard-item">
                  <div className="movement-info">
                    <div className={item.qty === 0 ? "movement-icon red" : "movement-icon orange"}>
                      {item.qty === 0 ? <FiXCircle /> : <FiAlertTriangle />}
                    </div>

                    <div>
                      <h4>{item.model}</h4>

                      <span>{item.printer}</span>
                    </div>
                  </div>

                  <div className="dashboard-item-right">
                    <strong className={item.qty === 0 ? "danger-text" : "warning-text"}>{item.qty} шт.</strong>

                    <span className={item.qty === 0 ? "status-badge red" : "status-badge orange"}>
                      {item.qty === 0 ? "Закончились" : "Мало"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <FiRefreshCw />
              <h3>Последние операции</h3>
            </div>

            <div className="dashboard-list">
              {movements.slice(0, 5).map((item) => (
                <div key={item.id} className="dashboard-item">
                  <div className="movement-info">
                    <div className="movement-icon">{getMovementIcon(item.action_type)}</div>

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
