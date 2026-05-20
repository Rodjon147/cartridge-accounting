import { useState } from "react"
import styles from "./AddMovementModal.module.css"
import api from "../../api/api"

function AddMovementModal({ cartridge, closeModal, refreshCartridges }) {
  const [formData, setFormData] = useState({
    cartridge_id: cartridge.id,
    action_type: "Выдача",
    to_location: "",
    quantity: 1,
    comment: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/movements", formData)

      refreshCartridges()
      closeModal()
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Добавить операцию</h2>

        <form onSubmit={handleSubmit}>
          <div className="selected-cartridge">
            <span>Картридж:</span>
            <strong>{cartridge.model}</strong>
          </div>

          <select name="action_type" onChange={handleChange}>
            <option>Выдача</option>

            <option>Возврат</option>

            <option>Заправка</option>

            <option>Списание</option>
          </select>

          <input type="text" name="to_location" placeholder="Принтер / отдел" onChange={handleChange} />

          <input type="number" name="quantity" placeholder="Количество" onChange={handleChange} />

          <textarea name="comment" placeholder="Примечание" onChange={handleChange} />

          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveBtn}>
              Сохранить
            </button>

            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMovementModal
