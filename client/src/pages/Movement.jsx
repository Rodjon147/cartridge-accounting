import { useEffect, useState } from "react"
import api from "../api/api"
import Topbar from "../components/layout/Topbar"

function Movement() {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovements = async () => {
    try {
      const response = await api.get("/movements")

      setMovements(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMovement = async (id) => {
    const confirmDelete = window.confirm("Отменить операцию?")

    if (!confirmDelete) return

    try {
      await api.delete(`/movements/${id}`)

      fetchMovements()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadMovement = async () => {
      await fetchMovements()
    }
    loadMovement()
  }, [])

  if (loading) {
    return <h2>Загрузка...</h2>
  }

  return (
    <>
      <Topbar title="Движение" />
      <div className="content">
        <div className="table-container">
          <table className="cartridge-table">
            <thead>
              <tr>
                <th>Дата</th>

                <th>Операция</th>

                <th>Картридж</th>

                <th>Кол-во</th>

                <th>Принтер / Отдел</th>

                <th>Примечание</th>

                <th>Отмена</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{new Date(movement.movement_date).toLocaleDateString()}</td>

                  <td>{movement.action_type}</td>

                  <td>{movement.cartridge_model}</td>

                  <td>{movement.quantity}</td>

                  <td>{movement.to_location || "-"}</td>

                  <td>{movement.comment || "-"}</td>

                  <td className="actions-cell">
                    <button className="delete-btn" onClick={() => deleteMovement(movement.id)}>
                      Отменить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Movement
