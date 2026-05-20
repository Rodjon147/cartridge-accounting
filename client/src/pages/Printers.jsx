import { useEffect, useState } from "react"
import api from "../api/api"
import AddPrinterModal from "../components/ui/AddPrinterModal"
import EditPrinterModal from "../components/ui/EditPrinterModal"
import Topbar from "../components/layout/Topbar"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import styles from "./Printers.module.css"

function Printers() {
  const [printers, setPrinters] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPrinter, setEditingPrinter] = useState(null)

  const fetchPrinters = async () => {
    try {
      const response = await api.get("/printers")

      setPrinters(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deletePrinter = async (id) => {
    const confirmDelete = window.confirm("Удалить принтер?")

    if (!confirmDelete) return

    try {
      await api.delete(`/printers/${id}`)

      fetchPrinters()
    } catch (error) {
      console.error(error)
    }
  }

  const openEditModal = (printer) => {
    setEditingPrinter(printer)
  }

  useEffect(() => {
    const loadPrinters = async () => {
      await fetchPrinters()
    }
    loadPrinters()
  }, [])

  if (loading) {
    return <h2>Загрузка...</h2>
  }

  return (
    <>
      <Topbar title="Принтеры" onAdd={() => setIsModalOpen(true)} />
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <table className={styles.cartridgeTable}>
            <thead>
              <tr>
                <th>Название</th>

                <th>Модель</th>

                <th>Отдел</th>

                <th>Картридж</th>

                <th>Статус</th>

                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              {printers.map((printer) => (
                <tr key={printer.id}>
                  <td>{printer.name}</td>

                  <td>{printer.model}</td>

                  <td>{printer.department}</td>

                  <td>{printer.cartridge}</td>

                  <td>{printer.status}</td>

                  <td className={styles.actionsCell}>
                    <button className={`${styles.iconBtn} ${styles.editIcon}`} onClick={() => openEditModal(printer)}>
                      <FiEdit2 />
                    </button>

                    <button className={`${styles.iconBtn} ${styles.deleteIcon}`} onClick={() => deletePrinter(printer.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && <AddPrinterModal closeModal={() => setIsModalOpen(false)} refreshPrinters={fetchPrinters} />}
        {editingPrinter && (
          <EditPrinterModal
            printer={editingPrinter}
            closeModal={() => setEditingPrinter(null)}
            refreshPrinters={fetchPrinters}
          />
        )}
      </div>
    </>
  )
}

export default Printers
