import { useState } from "react"
import api from "../../api/api"

function EditPrinterModal({ printer, closeModal, refreshPrinters }) {
  const [formData, setFormData] = useState({
    name: printer.name,
    model: printer.model,
    department: printer.department,
    cartridge: printer.cartridge,
    status: printer.status
  })

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/printers/${printer.id}`, formData)

      refreshPrinters()

      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактировать принтер</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <input type="text" name="model" value={formData.model} onChange={handleChange} />

          <input type="text" name="department" value={formData.department} onChange={handleChange} />

          <input type="text" name="cartridge" value={formData.cartridge} onChange={handleChange} />

          <input type="text" name="status" value={formData.status} onChange={handleChange} />

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

export default EditPrinterModal
