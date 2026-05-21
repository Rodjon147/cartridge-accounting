import { useState } from "react"
import api from "../../api/api"
import styles from "./EditCartridgeModal.module.css"
import { IoClose } from "react-icons/io5"
import { FaSave } from "react-icons/fa"

function EditCartridgeModal({ cartridge, closeModal, refreshCartridges }) {
  const [formData, setFormData] = useState({
    model: cartridge.model,
    type: cartridge.type || "Лазерный",
    printer: cartridge.printer,
    qty: cartridge.qty,
    min_qty: cartridge.min_qty,
    refill_date: cartridge.refill_date ? cartridge.refill_date.split("T")[0] : "",
    note: cartridge.note || "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/cartridges/${cartridge.id}`, formData)
      refreshCartridges()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Редактировать картридж</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            <IoClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Модель картриджа *</label>
              <input type="text" name="model" value={formData.model} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Тип</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Лазерный">Лазерный</option>
                <option value="Струйный">Струйный</option>
                <option value="Матричный">Матричный</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Принтер</label>
              <input type="text" name="printer" value={formData.printer} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Количество *</label>
              <input type="number" name="qty" value={formData.qty} min="0" onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Мин. остаток (предупреждение)</label>
              <input
                type="number"
                name="min_qty"
                value={formData.min_qty}
                placeholder="2"
                min="0"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Дата последней заправки</label>
              <input type="date" name="refill_date" onChange={handleChange} />
            </div>
            <div className={`${styles.formGroup} ${styles.full}`}>
              <label>Примечание</label>
              <textarea
                name="note"
                placeholder="Дополнительная информация..."
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Отмена
            </button>
            <button type="submit" className={styles.saveBtn}>
              <FaSave />
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCartridgeModal
