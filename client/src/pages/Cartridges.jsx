import { useState, useEffect } from "react"
import api from "../api/api"
import AddCartridgeModal from "../components/ui/AddCartridgeModal"
import EditCartridgeModal from "../components/ui/EditCartridgeModal"
import AddMovementModal from "../components/ui/AddMovementModal"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import Topbar from "../components/layout/Topbar"
import styles from "./Cartridges.module.css"

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
    <>
      <Topbar title="Картриджи" onAdd={() => setIsModalOpen(true)} />
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <table className={styles.cartridgeTable}>
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
                    <div className={styles.cartridgeModel}>
                      <strong>{cartridge.model}</strong>

                      {cartridge.note && <span className={styles.cartridgeNote}>{cartridge.note}</span>}
                    </div>
                  </td>

                  <td>
                    <span className={styles.typeBadge}>{cartridge.type}</span>
                  </td>

                  <td>{cartridge.printer}</td>

                  <td>
                    <div className={styles.qtyCell}>
                      <span className={styles.qtyNumber}>{cartridge.qty}</span>

                      <div className={styles.qtyBar}>
                        <div
                          className={`${styles.qtyFill} ${
                            cartridge.qty === 0
                              ? styles.qtyDanger
                              : cartridge.qty <= cartridge.min_qty
                                ? styles.qtyWarning
                                : styles.qtyGood
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
                      className={`${styles.statusPill} ${
                        cartridge.qty === 0
                          ? styles.statusDanger
                          : cartridge.qty <= cartridge.min_qty
                            ? styles.statusWarning
                            : styles.statusGood
                      }`}
                    >
                      {cartridge.qty === 0 ? "Закончились" : cartridge.qty <= cartridge.min_qty ? "Мало" : "В норме"}
                    </span>
                  </td>

                  <td>{cartridge.refill_date ? new Date(cartridge.refill_date).toLocaleDateString() : "-"}</td>

                  <td>
                    <div className={styles.actionsGroup}>
                      <button
                        className={`${styles.iconBtn} ${styles.editIcon}`}
                        onClick={() => openEditModal(cartridge)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className={`${styles.iconBtn} ${styles.movementIcon}`}
                        onClick={() => setMovementCartridge(cartridge)}
                      >
                        <FaArrowRightArrowLeft />
                      </button>

                      <button
                        className={`${styles.iconBtn} ${styles.deleteIcon}`}
                        onClick={() => deleteCartridge(cartridge.id)}
                      >
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
    </>
  )
}

export default Cartridges
