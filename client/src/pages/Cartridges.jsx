import { useState, useEffect } from "react"
import api from "../api/api"
import AddCartridgeModal from "../components/ui/AddCartridgeModal"
import EditCartridgeModal from "../components/ui/EditCartridgeModal"
import AddMovementModal from "../components/ui/AddMovementModal"
import { FiEdit2, FiTrash2, FiRefreshCw } from "react-icons/fi"

function Cartridges() {
  const [cartridges, setCartridges] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCartridge, setEditingCartridge] = useState(null)
  const [movementCartridge, setMovementCartridge] = useState(null)

  const fetchCartridges = async () => {
    try {
      const response = await api.get("/cartridges")
      setCartridges(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCartridge = async (id) => {
    const confirmDelete = window.confirm("Удалить картридж?")

    if (!confirmDelete) return

    try {
      await api.delete(`/cartridges/${id}`)

      fetchCartridges()
    } catch (error) {
      console.error(error)
    }
  }

  const openEditModal = (cartridge) => {
    setEditingCartridge(cartridge)
  }

  useEffect(() => {
    const loadCartridges = async () => {
      await fetchCartridges()
    }
    loadCartridges()
  }, [])

  if (loading) {
    return <h2>Загрузка...</h2>
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Картриджи</h2>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          Добавить
        </button>
      </div>

      <div className="table-container">
        <table className="cartridge-table">
          <thead>
            <tr>
              <th>Модель</th>

              <th>Тип</th>

              <th>Принтер</th>

              <th>Кол-во</th>

              <th>Статус</th>

              <th>Заправлен</th>

              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {cartridges.map((cartridge) => (
              <tr key={cartridge.id} className={cartridge.qty <= cartridge.min_qty ? "low-stock-row" : ""}>

                <td>
                  <div className="cartridge-model">
                    <strong>{cartridge.model}</strong>

                    {cartridge.note && <span className="cartridge-note">{cartridge.note}</span>}
                  </div>
                </td>

                <td>
                  <span className="type-badge">{cartridge.type}</span>
                </td>

                <td>{cartridge.printer}</td>

                <td>
                  <div className="qty-cell">
                    <span className="qty-number">{cartridge.qty}</span>

                    <div className="qty-bar">
                      <div
                        className={`qty-fill ${
                          cartridge.qty === 0
                            ? "qty-danger"
                            : cartridge.qty <= cartridge.min_qty
                              ? "qty-warning"
                              : "qty-good"
                        }`}
                        style={{
                          width: `${Math.min(cartridge.qty * 20, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`status-pill ${
                      cartridge.qty === 0
                        ? "status-danger"
                        : cartridge.qty <= cartridge.min_qty
                          ? "status-warning"
                          : "status-good"
                    }`}
                  >
                    {cartridge.qty === 0 ? "Закончились" : cartridge.qty <= cartridge.min_qty ? "Мало" : "В норме"}
                  </span>
                </td>

                <td>{cartridge.refill_date ? new Date(cartridge.refill_date).toLocaleDateString() : "-"}</td>

                <td>
                  <div className="actions-group">
                    <button className="icon-btn edit-icon" onClick={() => openEditModal(cartridge)}>
                      <FiEdit2 />
                    </button>

                    <button className="icon-btn movement-icon" onClick={() => setMovementCartridge(cartridge)}>
                      <FiRefreshCw />
                    </button>

                    <button className="icon-btn delete-icon" onClick={() => deleteCartridge(cartridge.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AddCartridgeModal closeModal={() => setIsModalOpen(false)} refreshCartridges={fetchCartridges} />
      )}
      {editingCartridge && (
        <EditCartridgeModal
          cartridge={editingCartridge}
          closeModal={() => setEditingCartridge(null)}
          refreshCartridges={fetchCartridges}
        />
      )}
      {movementCartridge && (
        <AddMovementModal
          cartridge={movementCartridge}
          closeModal={() => setMovementCartridge(null)}
          refreshCartridges={fetchCartridges}
        />
      )}
    </div>
  )
}

export default Cartridges
