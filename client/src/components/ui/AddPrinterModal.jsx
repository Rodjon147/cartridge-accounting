import { useState } from "react"
import api from "../../api/api"
import styles from "./AddPrinterModal.module.css"
import { IoClose } from "react-icons/io5"
import { FaSave } from "react-icons/fa"

function AddPrinterModal({ closeModal, refreshPrinters }) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    department: "",
    cartridge: "",
    status: "Работает",
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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Добавить принтер</h2>
          <button className={styles.modalClose} onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Название / Инв. номер *</label>
              <input type="text" name="name" placeholder="Принтер-01" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Модель</label>
              <input type="text" name="model" placeholder="HP LaserJet P1102" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Отдел</label>
              <input type="text" name="department" placeholder="Бухгалтерия" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Картридж</label>
              <input type="text" name="cartridge" placeholder="HP 85A" onChange={handleChange} />
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

export default AddPrinterModal
