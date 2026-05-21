import { useState } from "react"
import api from "../../api/api"
import styles from "./EditPrinterModal.module.css"
import { IoClose } from "react-icons/io5"
import { FaSave } from "react-icons/fa"

function EditPrinterModal({ printer, closeModal, refreshPrinters }) {
  const [formData, setFormData] = useState({
    name: printer.name,
    model: printer.model,
    department: printer.department,
    cartridge: printer.cartridge,
    status: printer.status || "Работает",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Редактировать принтер</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            <IoClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Название / Инв. номер *</label>
              <input type="text" name="name" placeholder="Принтер-01" value={formData.name} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Модель</label>
              <input
                type="text"
                name="model"
                placeholder="HP LaserJet P1102"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Отдел</label>
              <input
                type="text"
                name="department"
                placeholder="Бухгалтерия"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Картридж</label>
              <input
                type="text"
                name="cartridge"
                placeholder="HP 85A"
                value={formData.cartridge}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.full}`}>
              <label>Статус</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Работает">Работает</option>
                <option value="На ремонте">На ремонте</option>
                <option value="Не работает">Не работает</option>
              </select>
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

export default EditPrinterModal
