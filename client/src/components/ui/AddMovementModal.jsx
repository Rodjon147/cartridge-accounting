import { useEffect, useState } from "react"

import api from "../../api/api"

function AddMovementModal({ closeModal, refreshMovements }) {
  const [cartridges, setCartridges] = useState([])

  const [formData, setFormData] = useState({
    cartridge_id: "",
    action_type: "Выдача",
    to_location: "",
    quantity: 1,
    comment: "",
  })

  useEffect(() => {
    const loadCartridges = async () => {
      try {
        const response = await api.get("/cartridges")

        setCartridges(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    loadCartridges()
  }, [])

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/movements", formData)

      refreshMovements()

      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить операцию</h2>

        <form onSubmit={handleSubmit}>
          <select name="cartridge_id" onChange={handleChange} required>
            <option value="">Выберите картридж</option>

            {cartridges.map((cartridge) => (
              <option key={cartridge.id} value={cartridge.id}>
                {cartridge.model}
              </option>
            ))}
          </select>

          <select name="action_type" onChange={handleChange}>
            <option>Выдача</option>

            <option>Возврат</option>

            <option>Заправка</option>

            <option>Списание</option>
          </select>

          <input type="text" name="to_location" placeholder="Принтер / отдел" onChange={handleChange} />

          <input type="number" name="quantity" placeholder="Количество" onChange={handleChange} />

          <textarea name="comment" placeholder="Примечание" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Сохранить
            </button>

            <button type="button" className="cancel-btn" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMovementModal
