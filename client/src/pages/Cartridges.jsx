import { useState, useEffect } from "react"
import api from "../api/api"
import AddCartridgeModal from "../components/ui/AddCartridgeModal"
import EditCartridgeModal from "../components/ui/EditCartridgeModal"

function Cartridges() {

  const [cartridges, setCartridges] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCartridge, setEditingCartridge] = useState(null)

  const fetchCartridges = async () => {
    try {
      const response = await api.get("/cartridges");
      setCartridges(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteCartridge = async (id) => {

    const confirmDelete = window.confirm(
      "Удалить картридж?"
    )

    if (!confirmDelete) return

    try {

      await api.delete(`/cartridges/${id}`)

      fetchCartridges()

    } catch (error) {

      console.error(error)

    }
  }

  const openEditModal = (cartridge) => { setEditingCartridge(cartridge) }

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
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>Добавить</button>
      </div>

      <div className="table-container">

      <table className="cartridge-table">

        <thead>
            <tr>
                <th>ID</th>
                <th>Модель</th>
                <th>Тип</th>
                <th>Принтер</th>
                <th>Количество</th>
                <th>Минимум</th>
                <th>Действия</th>
            </tr>
        </thead>

        <tbody>

          {cartridges.map((cartridge) => (

            <tr key={cartridge.id}>

              <td>{cartridge.id}</td>

              <td>{cartridge.model}</td>

              <td>{cartridge.type}</td>

              <td>{cartridge.printer}</td>

              <td>{cartridge.qty}</td>

              <td>{cartridge.min_qty}</td>

              <td className="actions-cell">

                <button className="edit-btn" onClick={() => openEditModal(cartridge)}> Изменить </button>

                <button className="delete-btn" onClick={() => deleteCartridge(cartridge.id)}> Удалить </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>
      {
        isModalOpen && (
          <AddCartridgeModal closeModal={() => setIsModalOpen(false)} refreshCartridges={fetchCartridges}/>
        )
      }
      {
        editingCartridge && (
          <EditCartridgeModal cartridge={editingCartridge} closeModal={() => setEditingCartridge(null)} refreshCartridges={fetchCartridges}/>
        )
      }
    </div>
    )
}

export default Cartridges
