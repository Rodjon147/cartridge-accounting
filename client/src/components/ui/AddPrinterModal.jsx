import { useState } from "react"
import api from "../../api/api"

function AddPrinterModal({ closeModal, refreshPrinters }) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    department: "",
    cartridge: "",
    status: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/printers", formData)

      refreshPrinters()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить принтер</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Название" onChange={handleChange} />
          <input type="text" name="model" placeholder="Модель" onChange={handleChange} />
          <input type="text" name="department" placeholder="Отдел" onChange={handleChange} />
          <input type="text" name="cartridge" placeholder="Картридж" onChange={handleChange} />
          <input type="text" name="status" placeholder="Статус" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" className="save-btn">Сохранить</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPrinterModal
