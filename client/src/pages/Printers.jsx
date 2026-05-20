import { useEffect, useState } from "react"
import api from "../api/api"
import AddPrinterModal from "../components/ui/AddPrinterModal"
import EditPrinterModal from "../components/ui/EditPrinterModal"
import Topbar from "../components/layout/Topbar"

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
      <div className="content">
        <div className="table-container">
          <table className="cartridge-table">
            <thead>
              <tr>
                <th>ID</th>

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
                  <td>{printer.id}</td>

                  <td>{printer.name}</td>

                  <td>{printer.model}</td>

                  <td>{printer.department}</td>

                  <td>{printer.cartridge}</td>

                  <td>{printer.status}</td>

                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => openEditModal(printer)}>
                      Изменить
                    </button>

                    <button className="delete-btn" onClick={() => deletePrinter(printer.id)}>
                      Удалить
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
