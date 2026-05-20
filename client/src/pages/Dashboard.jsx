import { useEffect, useState } from "react"
import api from "../api/api"
import Topbar from "../components/layout/Topbar"

function Dashboard() {
  const [stats, setStats] = useState({
    totalCartridges: 0,
    lowStock: 0,
    totalPrinters: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/dashboard/stats")
        setStats(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    loadStats()
  }, [])

  return (
    <>
      <Topbar title="Дашборд" />
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Всего картриджей</h3>
            <p> {stats.totalCartridges} </p>
          </div>

          <div className="stat-card warning">
            <h3>Заканчиваются</h3>
            <p>{stats.lowStock}</p>
          </div>

          <div className="stat-card">
            <h3>Принтеров</h3>
            <p>{stats.totalPrinters}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
